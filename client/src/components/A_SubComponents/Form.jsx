


const Form = () => {

    const params = new URLSearchParams({
        merchant_id: "....",
        merchant_key: "....",
        return_url: "https://yourApplication/paymentscreen",
        cancel_url: "https://yourApplication/paymentscreen",
        notify_url: "https://yourApplication/paymentscreen",
        name_first: name,
        email_address: email,
        m_payment_id: unique_id_for_user,
        amount: amount,
        item_name: payment_name,
        item_description: description_if_any,
        custom_int1: custome_integer_value_if_any,
        custom_str1: custome_string_value_if_any,
        custom_str2: custome_string_value_if_any,
        passphrase: passphrase_set_in_payfast_account.
    });
      
      // Create an MD5 signature of it.
    const MD5Signature = md5(params.toString())
  return (
    <form action="https://www.payfast.co.za/eng/process" method="POST">
          <input type="hidden" name="merchant_id" value="...." />
          <input type="hidden" name="merchant_key" value="....." />
          <input type="hidden" name="return_url" value="https://yourApplication/paymentscreen" />
          <input type="hidden" name="cancel_url" value="https://yourApplication/paymentscreen" />
          <input type="hidden" name="notify_url" value="https://yourApplication/paymentscreen" />
          <input type="hidden" name="name_first" value={name} />
          <input type="hidden" name="email_address" value={email} />
          <input type="hidden" name="m_payment_id" value={unique_id_for_user} />
          <input type="hidden" name="amount" value={amount} />
          <input type="hidden" name="item_name" value={payment_name} />
          <input type="hidden" name="item_description" value={description_if_any} />
          <input type="hidden" name="custom_int1" value={custome_integer_value_if_any} />
          <input type="hidden" name="custom_str1" value={custome_string_value_if_any} />
          <input type="hidden" name="custom_str2" value={custome_string_value_if_any} />
          <input type="hidden" name="passphrase" value="passphrase" />
          <input type="hidden" name="signature" value={MD5Signature} />
          <div className="row" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="col-lg-6">
              <img alt="payfast" src="../public/upload/payfastpaynow.png" vspace="3" width="100%" height="100%" />
            </div>
            <div className="col-lg-6">
                <input style={{marginRight: 20, float: 'right'}} name="disable" type="submit" disabled={isEnablePayment} width="100%" height="100%" alt="Submit" align="bottom" value="Purchase" />
            </div>
          </div>
        </form>
  )
}

export default Form