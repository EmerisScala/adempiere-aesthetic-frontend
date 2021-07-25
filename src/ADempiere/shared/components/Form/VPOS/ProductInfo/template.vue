<template>
  <div>
    <el-form-item>
      <template slot="label">
        {{ $t('form.productInfo.codeProduct') }}
         <el-popover
          placement="right"
          trigger="click"
          width="800"
        >
          <ProductInfoList />
          <el-button
            slot="reference"
            type="text"
            icon="el-icon-search"
            style="color: black"
          />
        </el-popover>
      </template>

      <el-autocomplete
        v-model="value"
        v-shortkey="keyShortcuts"
        :placeholder="$t('quickAccess.searchWithEnter')"
        clearable
        style="width: 100%;"
        popper-class="custom-field-prodcut-info"
        :fetch-suggestions="localSearch"
        :select-when-unmatched="true"
        @shortkey.native="shortcutKeyMethod"
        @select="handleSelect"
      >
        <template slot="prefix">
          <svg-icon
            icon-class="shopping"
            class="el-input__icon"
          />
        </template>

        <template slot-scope="props">
          <div class="header">
            <b> {{ props.item.product.value }} - {{ props.item.product.name }} </b>
          </div>
          <div>
            <div style="float: left;width: 70%;">
              <p style="overflow: hidden;text-overflow: ellipsis;text-align: inherit;">
                {{ props.item.product.upc }} <br>
                {{ props.item.product.description }}
              </p>
            </div>
            <div style="width: 30%;float: right;">
              <p style="overflow: hidden;text-overflow: ellipsis;text-align: end;">
                {{ formatPrice(props.item.priceStandard, props.item.currency.iSOCode) }}
                <br>
                {{ formatQuantity(props.item.quantityAvailable) }}
              </p>
            </div>
          </div>
        </template>
      </el-autocomplete>
    </el-form-item>
  </div>
</template>

<style lang="scss" scope>
  .transition-box {
    z-index: 3;
    position: absolute;
    width: 800px;
    left: 15%;
  }
  .custom-field-prodcut-info {
    li {
      line-height: normal;
      padding: 15px;

      .header {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .upc {
        color: #7e7e7e;
        padding-top: 10px;
        float: left;
      }
      .description {
        padding-top: 10px;
        float: left;
      }
      .price {
        color: #7e7e7e;
        padding-top: 10px;
        float: right;
        padding-right: 10px;
      }
      .quantityAvailable {
        float: right;
        padding-top: 10px;
      }
    }
  }
</style>
