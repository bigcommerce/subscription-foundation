import BigBaseApi from "../big-base-api";

/**
 * Customer API
 */
export default class CustomersApi extends BigBaseApi {
  public baseUri = "/customers";

  /**
   * Get Customer v2
   * @param customer_id
   * @returns
   */
  public async get_customer(customer_id: string) {
    return await this.client.get(`${this.baseUri}/${customer_id}`);
  }

  /**
   * Get Customer Addresses v2
   * @param customer_id
   * @returns
   */
  public async get_customer_addresses(customer_id: string) {
    return await this.client.get(`${this.baseUri}/${customer_id}/addresses`);
  }

  /**
   * Get Stored Instruments (beta) v3
   * Lists all available stored instruments for a customer.
   * This list will include all types of stored instruments namely card, account and bank_account instruments
   * @param customer_id  string  Required.
   * @returns
   */
  public async get_stored_instruments(customer_id: string) {
    return await this.client.get(
      `${this.baseUri}/${customer_id}/stored-instruments`
    );
  }

  /**
   * Get a customer attribute value by attribute id and customer id
   * @param format
   * @param attribute_id
   * @param customer_id
   * @returns {any}
   */
  public async getCustomerAttributeValue(
    format: string,
    attribute_id: number,
    customer_id: number
  ) {
    const attributeSearchResults = await this.client.get(
      `${this.baseUri}/attribute-values?attribute_id:in=${attribute_id}&customer_id:in=${customer_id}`
    );

    if (attributeSearchResults.data?.length > 0) {
      const value = attributeSearchResults.data[0].attribute_value;

      return format === "array" || format === "object"
        ? JSON.parse(value)
        : value;
    }

    return false;
  }

  /**
   * Upsert a customer attribute value by attribute id and customer id
   * @param format
   * @param attribute_id
   * @param value
   * @param customer_id
   * @returns {any}
   */
  public async upsertCustomerAttributeValue(
    format: string,
    attribute_id: number,
    value: any,
    customer_id: number
  ) {
    if (format === "array" || format === "object") {
      value = JSON.stringify(value);
    }

    return await this.client.put(`${this.baseUri}/attribute-values`, [
      {
        attribute_id: attribute_id,
        value: value,
        customer_id: customer_id
      }
    ]);
  }

  /**
   * Fetch existing IDs for the custom attributes that save subscription details within the customer record
   * @returns {object}
   */
  public async getExistingCustomerAttributeNameIds() {
    const attributeNameSearchResults = await this.client.get(
      `${this.baseUri}/attributes?name=${process.env.SUBSCRIPTION_CUSTOMER_ATTRIBUTE_NAME}`
    );
    const attributeNameSearchResults2 = await this.client.get(
      `${this.baseUri}/attributes?name=${process.env.SUBSCRIPTION_IDS_ATTRIBUTE_NAME}`
    );

    return {
      [process.env.SUBSCRIPTION_CUSTOMER_ATTRIBUTE_NAME]:
        attributeNameSearchResults.data[0]?.id,
      [process.env.SUBSCRIPTION_IDS_ATTRIBUTE_NAME]:
        attributeNameSearchResults2.data[0]?.id
    };
  }

  /**
   * Create the necessary customer attributes that related subscription ids will be saved inside
   * @returns {any}
   */
  public async upsertInitialCustomerAttributes() {
    let existingCustomerAttributeNameIds =
      await this.getExistingCustomerAttributeNameIds();
    let customerAttributeNamesToCreate = [];

    for (const attributeName in existingCustomerAttributeNameIds) {
      const attributeNameId = existingCustomerAttributeNameIds[attributeName];

      if (!attributeNameId) {
        customerAttributeNamesToCreate.push({
          name: attributeName,
          type: "string"
        });
      }
    }

    if (customerAttributeNamesToCreate.length > 0) {
      const attributeCreationResults = await this.client.post(
        `${this.baseUri}/attributes`,
        customerAttributeNamesToCreate
      );

      attributeCreationResults.data.forEach(attribute => {
        existingCustomerAttributeNameIds[attribute.name] = attribute.id;
      });
    }

    return existingCustomerAttributeNameIds;
  }

  /**
   * Validate if the passed customer id and email combo match an existing BigCommerce customer
   * @param customer_id
   * @param customer_email
   * @returns {Boolean}
   */
  public async validateCustomerIdAndEmail(
    customer_id: string,
    customer_email: string
  ) {
    const customerSearchResults = await this.client.get(
      `${this.baseUri}?id:in=${customer_id}&email:in=${encodeURIComponent(
        customer_email
      )}`
    );

    return customerSearchResults.data?.length > 0;
  }

  /**
   * Validate if a passed attribute value matches an existing record on the BigCommerce customer attributes
   * @param attribute_id
   * @param bigcommerce_customer_id
   * @param attribute_value_to_validate
   * @returns {Boolean}
   */
  public async validateCustomerIdAttribute(
    attribute_id: number,
    bigcommerce_customer_id: string,
    attribute_value_to_validate: string
  ) {
    const attributeSearchResults = await this.client.get(
      `${this.baseUri}/attribute-values?attribute_id:in=${attribute_id}&customer_id:in=${bigcommerce_customer_id}`
    );

    return (
      attributeSearchResults.data?.length > 0 &&
      attributeSearchResults.data[0].attribute_value ===
        attribute_value_to_validate
    );
  }
}
