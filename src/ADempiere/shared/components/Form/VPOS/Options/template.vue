<template>
  <div>
    <div style="text-align: center">
      <b>{{ $t('form.pos.title') }}</b>
      <br />
      {{ $t('form.pos.optionsPoinSales.title') }}
    </div>
    <modal-dialog
      :parent-uuid="processPos"
      :container-uuid="processPos"
      panel-type="From"
    />
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        :title="$t('form.pos.optionsPoinSales.salesOrder.title')"
        name="salesOrder"
      >
        <el-row :gutter="12" style="padding-right: 10px;">
          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <p
                :style="
                  isEmptyValue($route.query.action)
                    ? 'cursor: not-allowed; text-align: center !important; color: gray;'
                    : blockOption
                "
                @click="newOrder"
              >
                <i class="el-icon-news" />
                <br />
                {{ $t('form.pos.optionsPoinSales.salesOrder.newOrder') }}
              </p>
            </el-card>
          </el-col>

          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <el-popover
                placement="right"
                width="800"
                trigger="click"
                @show="seeOrderList"
                @hide="showFieldListOrder = !showFieldListOrder"
              >
                <OrdersList
                  :parent-metadata="metadata"
                  :show-field="showFieldListOrder"
                />
                <p slot="reference" :style="blockOption">
                  <el-button
                    type="text"
                    @click="showFieldListOrder = !showFieldListOrder"
                  >
                    <svg-icon name="list" icon-class="list" />
                    <br />
                    {{
                      $t('form.pos.optionsPoinSales.salesOrder.ordersHistory')
                    }}
                  </el-button>
                </p>
              </el-popover>
            </el-card>
          </el-col>

          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <p :style="blockOption" @click="generateImmediateInvoice">
                <i class="el-icon-document-add" />
                <br />
                {{
                  $t(
                    'form.pos.optionsPoinSales.salesOrder.generateImmediateInvoice'
                  )
                }}
              </p>
            </el-card>
          </el-col>

          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <p :style="blockOption" @click="completePreparedOrder">
                <i class="el-icon-success" />
                <br />
                {{
                  $t(
                    'form.pos.optionsPoinSales.salesOrder.completePreparedOrder'
                  )
                }}
              </p>
            </el-card>
          </el-col>

          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <p :style="blockOption" @click="reverseSalesTransaction">
                <i class="el-icon-error" />
                <br />
                {{
                  $t(
                    'form.pos.optionsPoinSales.salesOrder.cancelSaleTransaction'
                  )
                }}
              </p>
            </el-card>
          </el-col>

          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <p :style="blockOption" @click="withdrawal">
                <i class="el-icon-document-remove" />
                <br />
                {{ $t('form.pos.optionsPoinSales.salesOrder.createPos') }}
              </p>
            </el-card>
          </el-col>

          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <p :style="blockOption" @click="printOrder">
                <i class="el-icon-printer" />
                <br />
                {{ $t('form.pos.optionsPoinSales.salesOrder.print') }}
              </p>
            </el-card>
          </el-col>

          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <p :style="blockOption" @click="createNewCustomerReturnOrder">
                <i class="el-icon-refresh-left" />
                <br />
                Crear Nueva Orden de Devolución
              </p>
            </el-card>
          </el-col>
          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <p :style="blockOption" @click="copyOrder">
                <i class="el-icon-document-copy" />
                <br />
                {{ $t('form.pos.optionsPoinSales.salesOrder.copyOrder') }}
              </p>
            </el-card>
          </el-col>
          <el-col :span="size">
            <el-card shadow="hover">
              <p :style="blockOption" @click="deleteOrder">
                <i class="el-icon-close" />
                <br />
                {{ $t('form.pos.optionsPoinSales.salesOrder.cancelOrder') }}
              </p>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>

      <el-collapse-item
        :title="$t('form.pos.optionsPoinSales.cashManagement.title')"
        name="cashManagement"
      >
        <el-row :gutter="12" style="padding-right: 10px;">
          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <p :style="blockOption">
                <i class="el-icon-sell" />
                <br />
                {{ $t('form.pos.optionsPoinSales.cashManagement.cashOpening') }}
              </p>
            </el-card>
          </el-col>
          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <p :style="blockOption">
                <i class="el-icon-money" />
                <br />
                {{
                  $t('form.pos.optionsPoinSales.cashManagement.cashwithdrawal')
                }}
              </p>
            </el-card>
          </el-col>
          <el-col
            :span="size"
            style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;"
          >
            <el-card shadow="hover">
              <p :style="blockOption" @click="cashClosing">
                <i class="el-icon-sold-out" />
                <br />
                {{ $t('form.pos.optionsPoinSales.cashManagement.closeBox') }}
              </p>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>

      <el-collapse-item
        :title="$t('form.pos.optionsPoinSales.generalOptions.title')"
        name="generalOptions"
      >
        <el-row :gutter="24" style="padding-right: 10px;">
          <el-col :span="size">
            <el-card shadow="hover">
              <el-dropdown
                trigger="click"
                style="padding-top: 8px;color: black;display: block;"
                @command="changePos"
              >
                <p
                  style="cursor: pointer;text-align: center !important;color: black;min-height: 50px;margin: 0px;"
                >
                  <i class="el-icon-mobile-phone" />
                  <br />
                  {{ $t('form.pos.optionsPoinSales.generalOptions.changePos') }}
                </p>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="item in listPointOfSales"
                    :key="item.uuid"
                    :command="item"
                  >
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-card>
          </el-col>

        <!-- Product List Price -->
          <el-col :span="size" style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;">
            <el-card shadow="hover">
              <el-popover placement="right" trigger="click" width="800">
                <list-product-price
                  :is-selectable="false"
                  popover-name="isShowPopoverMenu"
                />

                <div
                  slot="reference"
                  :style="blockOption"
                  @click="isShowProductsPriceList = !isShowProductsPriceList"
                >
                  <svg-icon name="shopping" icon-class="shopping" />
                  <br />
                  {{
                    $t('form.pos.optionsPoinSales.generalOptions.listProducts')
                  }}
                </div>
              </el-popover>
            </el-card>
          </el-col>
          <!-- List Warehouse -->
          <el-col :span="size" style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;">
            <el-card shadow="hover">
              <el-dropdown trigger="click" style="padding-top: 8px;color: black;display: block;" @command="changePos">
                <p
                  style="cursor: pointer;text-align: center !important;color: black;min-height: 50px;margin: 0px;"
                >
                  <svg-icon name="tree-table" icon-class="tree-table" />
                  <br>
                  {{ $t('form.pos.optionsPoinSales.generalOptions.changeWarehouseList') }}
                </p>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="item in warehousesListPointOfSales"
                    :key="item.uuid"
                    :command="item"
                  >
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-card>
          </el-col>
          <!-- List Price -->
          <el-col :span="size" style="padding-left: 12px;padding-right: 12px;padding-bottom: 10px;">
            <el-card shadow="hover">
              <el-dropdown trigger="click" style="padding-top: 8px;color: black;display: block;" @command="changePos">
                <p
                  style="cursor: pointer;text-align: center !important;color: black;min-height: 50px;margin: 0px;"
                >
                  <svg-icon name="list" icon-class="list" />
                  <br>
                  {{ $t('form.pos.optionsPoinSales.generalOptions.changePriceList') }} </p>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="item in priceListPointOfSales"
                    :key="item.uuid"
                    :command="item"
                  >
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped>
.el-button--text {
  border-color: transparent;
  color: black;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
.el-button--text:hover,
.el-button--text:focus {
  color: #46a6ff !important;
  border-color: transparent;
  background-color: transparent;
}
.el-col :hover {
  background-color: rgba(209, 233, 255, 0.719);
}
.title-of-option {
  cursor: pointer;
  text-align: center !important;
}
</style>
