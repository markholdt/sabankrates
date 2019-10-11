<template>
  <div class="ui">
    <div class="ui column padded grid centered">
      <div class="row">
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
            <div class="content">Fixed Deposit Rates</div>
          </h2>

          <div class="ui segment">
            <table class="ui celled green striped table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th class="right aligned">Effective Annual Rate</th>
                  <th class="right aligned">Est Earnings</th>
                  <th class="right aligned">Term</th>
                  <th class="right aligned">Min Deposit</th>
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
                  <td class="right aligned">
                    <Statistic :header="c.minDeposit | numeralFormat('0,00')" :subHeader="'ZAR'" />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="5">
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
                    <li>Ahh Absa. Absa, Absa, Absa. Your website looks great, but you do not disclose whether your fixed deposit rates are nominal or effective. Even your call centre does not know. Take a leaflet out of Capitec or Sasfin's book. They are transparent about their rates. Until you share this information, your rates will not appear here. Good-bye</li>
                  </ul>
                </small>
              </sui-accordion-content>
            </sui-accordion>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBankRates } from "@/gateway";
import Statistic from "@/components/Statistic.vue";
export default {
  name: "RatesList",
  components: { Statistic },
  props: {
    msg: String
  },
  data() {
    return {
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
        { key: "ca", text: "Capitec", value: "CAP" }
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
