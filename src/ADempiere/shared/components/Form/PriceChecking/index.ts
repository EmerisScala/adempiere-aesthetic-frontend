import { Component, Mixins, Ref } from 'vue-property-decorator'
import MixinForm from '../MixinForm'
import fieldList from './fieldList'
import Template from './template.vue'

import { getImagePath } from '@/ADempiere/shared/utils/resource'
import { getProductPrice } from '@/ADempiere/modules/core/CoreService'
import {
  formatPercent,
  formatPrice
} from '@/ADempiere/shared/utils/valueFormat'
import { IProductPriceData } from '@/ADempiere/modules/core/CoreType'
import { Namespaces } from '@/ADempiere/shared/utils/types'
import { IPointOfSalesData } from '@/ADempiere/modules/pos'
import { isEmptyValue } from '@/ADempiere/shared/utils/valueUtils'

@Component({
  name: 'PriceChecking',
  mixins: [MixinForm, Template]
})
export default class PriceChecking extends Mixins(MixinForm) {
  // public fieldsList: IProductCodeData[] = fieldList
  fieldsList = fieldList
  @Ref() readonly ProductValue?: HTMLElement[]
  public productPrice: any = {}
  public messageError = true
  public organizationBackground = ''
  public currentImageOfProduct = ''
  public search = 'sad'
  public resul = ''
  public backgroundForm = ''
  // eslint-disable-next-line
  public unsubscribe: Function = () => {}
  public timeOut?: NodeJS.Timeout

  // Computed properties
  get organizationImagePath(): string {
    return this.$store.getters.corporateBrandingImage
  }

  get defaultImage() {
    return require('@/image/ADempiere/priceChecking/no-image.jpg')
  }

  get currentPoint(): IPointOfSalesData | undefined {
    return this.$store.getters[Namespaces.PointOfSales + '/' + 'posAttributes']
      .currentPointOfSales
  }

  // Methods
  focusProductValue(): void {
    if (this.ProductValue && this.ProductValue[0]) {
      this.ProductValue[0].focus()
      // eslint-disable-next-line
      this.ProductValue[0].children[0].children[0].children[1].children[0]
    }
  }

  formatPercent = formatPercent

  formatPrice = formatPrice

  subscribeChanges() {
    return this.$store.subscribe((mutation, state) => {
      if (
        mutation.type ===
          Namespaces.PointOfSales + '/' + 'currentPointOfSales' ||
        mutation.type ===
          Namespaces.ProductPrice + '/' + 'setListProductPrice' ||
        mutation.type === Namespaces.Event + '/' + 'addFocusLost'
      ) {
        this.focusProductValue()
      }
      if (
        mutation.type === Namespaces.Event + '/' + 'addActionKeyPerformed' &&
        mutation.payload.columnName === 'ProductValue' &&
        this.productPrice.upc !== mutation.payload.value
      ) {
        // cleans all values except column name 'ProductValue'
        this.search = mutation.payload.value
        if (this.search && this.search.length >= 4) {
          getProductPrice({
            searchValue: mutation.payload.value,
            priceListUuid: this.currentPoint!.priceList.uuid
          })
            .then((productPrice: IProductPriceData) => {
              this.messageError = true
              const {
                product,
                taxRate,
                priceStandard: priceBase
              } = productPrice
              const { rate } = taxRate
              const { imageUrl: image } = product

              this.productPrice = {
                currency: productPrice.currency,
                image,
                grandTotal: this.getGrandTotal(priceBase, rate),
                productName: product.name,
                productDescription: product.description,
                priceBase,
                priceStandard: productPrice.priceStandard,
                priceList: productPrice.priceList,
                priceLimit: productPrice.priceLimit,
                taxRate: rate,
                taxName: taxRate.name,
                taxIndicator: taxRate.taxIndicator,
                schemaCurrency: productPrice.schemaCurrency,
                schemaGrandTotal: this.getGrandTotal(
                  productPrice.schemaPriceStandard!,
                  rate
                ),
                schemaPriceStandard: productPrice.schemaPriceStandard,
                schemaPriceList: productPrice.schemaPriceList,
                schemaPriceLimit: productPrice.schemaPriceLimit,
                taxAmt: this.getTaxAmount(priceBase, rate),
                upc: product.upc
              }
            })
            .catch(() => {
              this.messageError = false
              this.timeMessage()
              this.productPrice = {}
            })
            .finally(() => {
              this.$store.commit(
                Namespaces.FieldValue + '/' + 'updateValueOfField',
                {
                  containerUuid: this.containerUuid,
                  columnName: 'ProductValue',
                  value: ''
                }
              )

              this.search = ''
              this.currentImageOfProduct = ''
              if (isEmptyValue(this.productPrice.image)) {
                this.getImageFromSource(this.productPrice.image)
              }
            })
        }
      } else if (
        mutation.type === Namespaces.FieldValue + '/' + 'updateValueOfField' &&
        mutation.payload.columnName === 'ProductValue' &&
        !isEmptyValue(mutation.payload.value) &&
        (this.productPrice.upc !== mutation.payload.value)
      ) {
        if (this.timeOut) {
          clearTimeout(this.timeOut)
        }
        this.timeOut = setTimeout(() => {
          let value = mutation.payload.value
          if (typeof value[value.length - 1] === 'string') {
            value = mutation.payload.value.slice(0, -1)
          }
          getProductPrice({
            searchValue: mutation.payload.value,
            priceListUuid: this.currentPoint?.priceList.uuid
          })
            .then((productPrice: IProductPriceData) => {
              this.messageError = true
              const {
                product,
                taxRate,
                priceStandard: priceBase
              } = productPrice
              const { rate } = taxRate
              const { imageUrl: image } = product
              this.productPrice = {
                currency: productPrice.currency,
                image,
                grandTotal: this.getGrandTotal(priceBase, rate),
                productName: product.name,
                productDescription: product.description,
                priceBase,
                priceStandard: productPrice.priceStandard,
                priceList: productPrice.priceList,
                priceLimit: productPrice.priceLimit,
                schemaCurrency: productPrice.schemaCurrency,
                schemaGrandTotal: this.getGrandTotal(
                  productPrice.schemaPriceStandard!,
                  rate
                ),
                schemaPriceStandard: productPrice.schemaPriceStandard,
                schemaPriceList: productPrice.schemaPriceList,
                schemaPriceLimit: productPrice.schemaPriceLimit,
                taxRate: rate,
                taxName: taxRate.name,
                taxIndicator: taxRate.taxIndicator,
                taxAmt: this.getTaxAmount(priceBase, rate)
              }
            })
            .catch(() => {
              this.messageError = false
              this.timeMessage()
              this.productPrice = {}
            })
            .finally(() => {
              this.$store.commit(
                Namespaces.FieldValue + '/' + 'updateValueOfField',
                {
                  containerUuid: this.containerUuid,
                  columnName: 'ProductValue',
                  value: ''
                }
              )
              this.search = ''
              this.currentImageOfProduct = ''
              if (!this.productPrice.image) {
                this.getImageFromSource(this.productPrice.image)
              }
            })
        }, 500)
      }
      if (mutation.type === 'changeFormAttribute') {
        this.focusProductValue()
      }
    })
  }

  timeMessage() {
    setTimeout(() => {
      this.messageError = true
    }, 2000)
  }

  getTaxAmount(basePrice: number, taxRate: number): number {
    if (!basePrice || !taxRate) {
      return 0
    }
    return (basePrice * taxRate) / 100
  }

  getGrandTotal(basePrice: number, taxRate: number): number {
    if (!basePrice) {
      return 0
    }
    return basePrice + this.getTaxAmount(basePrice, taxRate)
  }

  getImageFromSource(fileName: string) {
    if (isEmptyValue(fileName)) {
      return this.defaultImage
    }
    const image = getImagePath({
      file: fileName,
      width: 250,
      height: 280
    })
    this.backgroundForm = image.uri
  }

  // Hooks
  created() {
    this.unsubscribe = this.subscribeChanges()
  }

  mounted() {
    this.backgroundForm = this.defaultImage
    this.getImageFromSource(this.organizationImagePath)
    this.$store.dispatch(Namespaces.PointOfSales + '/' + 'listPointOfSalesFromServer')
  }

  beforeDestroy() {
    this.unsubscribe()
  }
}
