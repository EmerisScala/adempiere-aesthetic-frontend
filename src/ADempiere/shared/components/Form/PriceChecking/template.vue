<template>
  <div v-if="isLoaded" style="height: 100% !important;">
    <el-container style="height: 100% !important;">
      <img
        fit="contain"
        :src="backgroundForm"
        class="background-price-checking"
        style="z-index: 2;"
      />
      <el-main>
        <el-form
          key="form-loaded"
          class="inquiry-form"
          label-position="top"
          label-width="10px"
          @submit.native.prevent="notSubmitForm"
        >
          <field
            v-for="field in fieldsList"
            id="ProductValue"
            ref="ProductValue"
            :key="field.columnName"
            :metadata-field="field"
            :v-model="field.value"
            class="product-value"
          />
        </el-form>

        <div class="inquiry-product" style="z-index: 4;">
          <el-row v-if="productPrice" :gutter="20">
            <el-col style="padding-left: 0px; padding-right: 0%;">
              <div class="product-description">
                {{ productPrice.productName }}
                {{ productPrice.productDescription }}
              </div>
              <br /><br /><br />

              <div class="product-price-base">
                {{ $t('form.priceChecking.basePrice') }}
                <span class="amount">
                  {{
                    formatPrice(
                      productPrice.priceBase,
                      productPrice.currency.iSOCode
                    )
                  }}
                </span>
              </div>
              <br /><br /><br />

              <div class="product-tax">
                {{ productPrice.taxName }}
                <span class="amount">
                  {{
                    formatPrice(
                      productPrice.taxAmt,
                      productPrice.currency.iSOCode
                    )
                  }}
                </span>
              </div>
              <br /><br /><br />

              <div class="product-price amount">
                <span style="float: right;">
                  {{
                    formatPrice(
                      productPrice.grandTotal,
                      productPrice.currency.iSOCode
                    )
                  }}
                </span>
                <br />
                {{
                  formatPrice(
                    productPrice.schemaGrandTotal,
                    productPrice.schemaCurrency.iSOCode
                  )
                }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="inquiry-product" style="z-index: 4;">
          <el-row v-if="!messageError" :gutter="20">
            <el-col style="padding-left: 0px; padding-right: 0%;">
              <div class="product-price amount">
                {{ $t('form.priceChecking.productNotFound') }}
              </div>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
  <div
    v-else
    key="form-loading"
    v-loading="!isLoaded"
    :element-loading-text="$t('notifications.loading')"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
    class="loading-panel"
  />
</template>

<style lang="scss" scoped>
.background-price-checking {
  width: 100%;
  height: 100%;
  float: inherit;
  background: white;
  // color: white;
  // opacity: 0.5;
}

.product-description {
  color: #32363a;
  font-size: 30px;
  float: right;
  padding-bottom: 0px;
}
.product-price-base,
.product-tax {
  font-size: 30px;
  float: right;
}
.product-price {
  padding-top: 15px;
  font-size: 50px;
  float: right;
}

.inquiry-form {
  position: absolute;
  right: 20%;
  width: 100%;
  top: 10%;
  z-index: 0;
}
.inquiry-product {
  position: absolute;
  right: 5%;
  width: 100%;
  top: 33%;
  .amount {
    color: black;
    font-weight: bold;
  }
}
</style>
<style lang="scss">
.price-inquiry {
  input {
    color: #606266 !important;
    font-size: 100% !important;
  }
}
.product-value {
  float: right;
  padding-right: 0% !important;
  z-index: 0;
  .el-form-item__label {
    font-size: 15px !important;
    color: #000 !important;
  }
}

.el-aside {
  background: white;
  width: 60%;
  overflow: hidden;
}

.el-form-item {
  margin-bottom: 10px !important;
  margin-left: 10px;
  margin-right: 0px !important;
}
</style>
