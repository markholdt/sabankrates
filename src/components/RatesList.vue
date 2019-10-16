<template>
  <div class="ui">
    <SignUpEmail :modal="signUpModal" @close="signUpModal = false" />

    <div class="ui column padded grid centered">
      <!-- computer only stuff -->
      <div class="computer tablet only row">
        <div class="three wide column">
          <h2 class="ui header">Filter</h2>
          <div class="ui form">
            <div class="field">
              <label>Sort by</label>
              <sui-dropdown
                placeholder="Sort"
                :labeled="true"
                selection
                :options="options"
                v-model="sortBy"
              />
            </div>
            <div class="field">
              <label>Age Criteria</label>
              <sui-dropdown
                fluid
                :options="ageOptions"
                placeholder="Show all ages"
                selection
                v-model="currentAge"
              />
            </div>
            <div class="field">
              <label>Investment Amount</label>
              <vue-numeric separator="," v-model="investmentAmount" :min="0"></vue-numeric>
            </div>
            <div class="field">
              <label>Filter Term</label>
              <sui-dropdown
                fluid
                multiple
                :options="termOptions"
                placeholder="Show all"
                selection
                v-model="currentTerm"
              />
            </div>
            <div class="field">
              <label>Filter Banks</label>
              <sui-dropdown
                fluid
                multiple
                :options="banks"
                placeholder="Show all"
                selection
                v-model="currentBank"
              />
            </div>

            <div class="ui primary button" @click.prevent="getResults(1)">Update</div>
          </div>
        </div>
        <div class="twelve wide column">
          <h2 class="ui header">
            <img
              class="ui medium circular image"
              src="https://lipis.github.io/flag-icon-css/flags/4x3/za.svg"
            />
            <div class="content">South Africa's Best Fixed Deposit Rates for {{ date| formatDate}}</div>
          </h2>

          <a
            :v-show="false"
            class="ui animated red fade button"
            href="https://share.hsforms.com/1BTVPlw6qRKWkt5FixDxHGw3wvyy"
            target="_blank"
            tabindex="0"
          >
            <div class="visible content">
              <i class="ui icon basic envelope open outline"></i>Get the FREE Fixed Deposit Report
            </div>
          </a>

          <div class="ui divider"></div>
          <div class="ui">
            <table class="ui celled green striped table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th class="right aligned">Effective Annual Rate</th>
                  <th class="right aligned">Est Earnings</th>
                  <th class="right aligned">Term</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in results">
                  <td>
                    <img
                      class="ui middle aligned image"
                      :src="'//logo.clearbit.com/' +  c.logo + '?size=25'"
                    />
                    {{c.bank}}
                  </td>
                  <td class="right aligned">
                    <Statistic
                      :header="c.annualPercentageYield + ' %'"
                      :subHeader="'as at ' + c.effectiveDate"
                    />
                  </td>
                  <td class="right aligned">
                    <div
                      class="ui middle aligned"
                      :data-tooltip="'Total estimated interest over ' + c.termDescription + ' given a R ' +  investmentAmount + ' investment.'"
                    >
                      <Statistic
                        :header="c.estimatedEarnings"
                        :icon="'question circle outline icon'"
                        :subHeader="'Total interest'"
                      />
                    </div>
                  </td>
                  <td class="right aligned">
                    <Statistic :header="c.term" :subHeader="'months'" />
                  </td>
                </tr>
                <tr>
                  <td colspan="4" class="right aligned">
                    <social-sharing
                      url="https://www.bankrate.co.za/depositRates"
                      inline-template
                      title="South Africa's fixed deposit rates compared"
                      quote="South Africa's fixed deposit rates compared"
                      hashtags="money"
                    >
                      <div>
                        <network network="facebook">
                          <button :data-tooltip="'Share'" class="ui circular facebook icon button">
                            <i class="facebook icon"></i>
                          </button>
                        </network>
                        <network network="twitter">
                          <button :data-tooltip="'Share'" class="ui circular twitter icon button">
                            <i class="twitter icon"></i>
                          </button>
                        </network>
                        <network network="linkedin">
                          <button :data-tooltip="'Share'" class="ui circular linkedin icon button">
                            <i class="linkedin icon"></i>
                          </button>
                        </network>
                      </div>
                    </social-sharing>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4">
                    <sui-menu v-if="totalPages > 1">
                      <a is="sui-menu-item" @click.prevent="getResults(1)">
                        <sui-icon name="left chevron" />First Page
                      </a>
                      <a
                        is="sui-menu-item"
                        v-if="((currentPageNr -4) > 0 && (currentPageNr -4 <= totalPages))"
                        @click.prevent="getResults(currentPageNr -4)"
                      >{{ currentPageNr -4}}</a>
                      <a
                        is="sui-menu-item"
                        v-if="((currentPageNr -3) > 0 && (currentPageNr -3 <= totalPages))"
                        @click.prevent="getResults(currentPageNr -3)"
                      >{{ currentPageNr -3}}</a>
                      <a
                        is="sui-menu-item"
                        v-if="((currentPageNr - 2) > 0 && (currentPageNr -2 <= totalPages))"
                        @click.prevent="getResults(currentPageNr -2)"
                      >{{ currentPageNr -2}}</a>
                      <a
                        is="sui-menu-item"
                        v-if="((currentPageNr -1) > 0 && (currentPageNr -1 <= totalPages))"
                        @click.prevent="getResults(currentPageNr -1)"
                      >{{ currentPageNr -1}}</a>
                      <div is="sui-menu-item">
                        <strong>{{ currentPageNr}}</strong>
                      </div>

                      <a
                        is="sui-menu-item"
                        v-if="((currentPageNr + 1) > 0 && (currentPageNr + 1 <= totalPages))"
                        @click.prevent="getResults(currentPageNr + 1)"
                      >{{ currentPageNr + 1}}</a>
                      <a
                        is="sui-menu-item"
                        v-if="((currentPageNr + 2) > 0 && (currentPageNr + 2 <= totalPages))"
                        @click.prevent="getResults(currentPageNr + 2)"
                      >{{ currentPageNr + 2}}</a>
                      <a
                        is="sui-menu-item"
                        v-if="((currentPageNr + 3) > 0 && (currentPageNr + 3 <= totalPages))"
                        @click.prevent="getResults(currentPageNr + 3)"
                      >{{ currentPageNr + 3}}</a>
                      <a
                        is="sui-menu-item"
                        v-if="((currentPageNr + 4) > 0 && (currentPageNr + 4 <= totalPages))"
                        @click.prevent="getResults(currentPageNr + 4)"
                      >{{ currentPageNr + 4}}</a>

                      <a is="sui-menu-item" @click.prevent="getResults(totalPages)">
                        <sui-icon name="right chevron" />Last Page
                      </a>
                    </sui-menu>
                  </td>
                </tr>
              </tfoot>
            </table>
            <sui-accordion exclusive>
              <sui-accordion-title active>
                <sui-icon name="dropdown" />
                <strong>Important notes for table</strong>
              </sui-accordion-title>
              <sui-accordion-content>
                <small>
                  <ul>
                    <li>
                      To make rates comparable across different banks; all rates have been converted to
                      <a
                        target="_blank"
                        href="https://en.wikipedia.org/wiki/Effective_interest_rate"
                      >effective annual interest rates</a>. To make a fair comparison, interest is assumed to be calculated daily and paid at maturity of term.
                    </li>
                    <li>The rates have been derived from banks' public websites</li>
                    <li>Actual rates received by any individual may differ to the rates shown above.</li>
                  </ul>
                </small>
              </sui-accordion-content>
              <sui-accordion-title>
                <sui-icon name="dropdown" />Why does
                <span style="color: red">Absa</span> not appear in the list?
              </sui-accordion-title>
              <sui-accordion-content>
                <small>
                  <ul>
                    <li>Some enquiries about their fixed deposit rates are outstanding. Specifically they do not disclose whether the quoted rates are nominal or effective.</li>
                  </ul>
                </small>
              </sui-accordion-content>
            </sui-accordion>
          </div>
        </div>
      </div>
      <div class="mobile only row">
        <sui-modal v-model="modal">
          <sui-modal-header>Filter</sui-modal-header>
          <sui-modal-content image>
            <sui-modal-description>
              <div class="ui form">
                <div class="field">
                  <label>Age Criteria</label>
                  <sui-dropdown
                    fluid
                    :options="ageOptions"
                    placeholder="Show all ages"
                    selection
                    v-model="currentAge"
                  />
                </div>
                <div class="field">
                  <label>Investment Amount</label>
                  <vue-numeric separator="," v-model="investmentAmount" :min="0"></vue-numeric>
                </div>
                <div class="field">
                  <label>Filter Term</label>
                  <sui-dropdown
                    fluid
                    multiple
                    :options="termOptions"
                    placeholder="Show all"
                    selection
                    v-model="currentTerm"
                  />
                </div>
                <div class="field">
                  <label>Filter Banks</label>
                  <sui-dropdown
                    fluid
                    multiple
                    :options="banks"
                    placeholder="Show all"
                    selection
                    v-model="currentBank"
                  />
                </div>
              </div>
            </sui-modal-description>
          </sui-modal-content>
          <sui-modal-actions>
            <sui-button positive @click.prevent="getMobileResults(1)">Apply</sui-button>
          </sui-modal-actions>
        </sui-modal>
        <div class="sixteen wide column">
          <h3 class="ui header">
            <div class="content">SA's Fixed Deposit Rates</div>
          </h3>
          <sui-button @click.native="toggle">Filter</sui-button>
          <table class="ui celled green striped table unstackable">
            <thead>
              <tr>
                <th>Name</th>
                <th class="right aligned">Rate</th>
                <th class="right aligned">Earnings</th>
                <th class="right aligned">Term</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in results">
                <td>
                  <img
                    class="ui middle aligned image"
                    :src="'//logo.clearbit.com/' +  c.logo + '?size=25'"
                  />
                  {{c.bank}}
                </td>
                <td class="right aligned">{{c.annualPercentageYield}} %</td>
                <td class="right aligned">{{c.estimatedEarnings}}</td>
                <td class="right aligned">{{c.term}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4">
                  <sui-menu class="ui secondary" v-if="totalPages > 1">
                    <a
                      is="sui-menu-item"
                      v-if="((currentPageNr -1) > 0 && (currentPageNr -1 <= totalPages))"
                      @click.prevent="getResults(currentPageNr -1)"
                    >
                      <strong>Previous Page</strong>
                    </a>

                    <a
                      is="sui-menu-item"
                      v-if="((currentPageNr + 1) > 0 && (currentPageNr + 1 <= totalPages))"
                      @click.prevent="getResults(currentPageNr + 1)"
                    >
                      <strong>Next Page</strong>
                    </a>
                  </sui-menu>
                </td>
              </tr>
            </tfoot>
          </table>
          <sui-accordion exclusive>
            <sui-accordion-title active>
              <sui-icon name="dropdown" />
              <strong>Important notes for table</strong>
            </sui-accordion-title>
            <sui-accordion-content>
              <small>
                <ul>
                  <li>
                    To make rates comparable across different banks; all rates have been converted to
                    <a
                      target="_blank"
                      href="https://en.wikipedia.org/wiki/Effective_interest_rate"
                    >effective annual interest rates</a>. To make a fair comparison, interest is assumed to be calculated daily and paid at maturity of term.
                  </li>
                  <li>The rates have been derived from banks' public websites</li>
                  <li>Actual rates received by any individual may differ to the rates shown above.</li>
                </ul>
              </small>
            </sui-accordion-content>
            <sui-accordion-title>
              <sui-icon name="dropdown" />Why does
              <span style="color: red">Absa</span> not appear in the list?
            </sui-accordion-title>
            <sui-accordion-content>
              <small>
                <ul>
                  <li>Some enquiries about their fixed deposit rates are outstanding. Specifically they do not disclose whether the quoted rates are nominal or effective.</li>
                </ul>
              </small>
            </sui-accordion-content>
          </sui-accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBankRates } from "@/gateway";
import Statistic from "@/components/Statistic.vue";
import SignUpEmail from "@/components/SignUpEmail.vue";
export default {
  name: "RatesList",
  components: { Statistic, SignUpEmail },
  props: {
    msg: String
  },
  data() {
    return {
      //
      signUpModal: false,
      modal: false,
      date: new Date(),
      investmentAmount: 10000,
      current: null,
      options: [
        { text: "Rate", value: "Rates" },
        { text: "Term", value: "Term" },

        { text: "Bank", value: "Bank" }
      ],
      sortBy: "Rates",
      currentTerm: [],
      termOptions: [
        {
          text: "1 month",
          value: 1
        },

        {
          text: "3 months",
          value: 3
        },
        {
          text: "6 months",
          value: 6
        },
        {
          text: "12 months",
          value: 12
        },
        {
          text: "18 months",
          value: 18
        },
        {
          text: "24 months",
          value: 24
        },
        {
          text: "36 months",
          value: 36
        },

        {
          text: "60 months",
          value: 60
        }
      ],
      currentBank: [],
      banks: [
        { key: "sb", text: "Standard Bank", value: "SB" },

        { key: "fnb", text: "FNB", value: "FNB" },
        { key: "ned", text: "Nedbank", value: "NED" },
        { key: "ca", text: "Capitec", value: "CAP" },
        { key: "sas", text: "Sasfin", value: "SAS" },
        { key: "afb", text: "African Bank", value: "AFB" }
      ],
      currentBank: [],
      currentAge: "18",
      ageOptions: [
        { key: "18", text: "younger than 55", value: "18" },
        { key: "55", text: "55 and older", value: "55" }
      ],
      //
      currentPageNr: 1,
      loading: false,
      totalRecords: 0,
      currentPageSize: 5,
      totalPages: 1,
      results: []
    };
  },
  methods: {
    toggle() {
      this.modal = !this.modal;
    },
    async getMobileResults(pageNr) {
      this.toggle();
      this.getResults(pageNr);
    },
    async getResults(pageNr) {
      console.log(this.currentBank);
      const response = await getBankRates({
        investmentAmount: this.investmentAmount,
        termOptions: { selected: this.currentTerm },
        banks: { selected: this.currentBank },
        age: this.currentAge,
        pageSize: this.currentPageSize,
        pageNr: pageNr,
        sortBy: this.sortBy
      });
      console.log(response);
      this.results = response.result;
      this.totalRecords = response.totalRecords;
      this.totalPages = response.totalPages;
      this.currentPageNr = response.currentPageNr;
    }
  },
  async mounted() {
    await this.getResults(1);
  }
};
</script>
