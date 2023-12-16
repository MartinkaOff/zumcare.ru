import React, { useState } from "react"
import { useRef } from "react";

const [resultPayment, setResultPayment] = useState('');

const formReception = useRef();

const pay = function() {
    //@ts-ignore
    var blocksApp = new cp.PaymentBlocks({
      publicId: "test_api_00000000000000000000002",
      description: "Сессия с специалистом",
      amount: 10000,
      currency: "KZT",
      invoiceId: "Специалист",
      accountId: "Клиент",
      email: "",
      requireEmail: true,
      language: "ru-RU",
      applePaySupport: false,
      googlePaySupport: false,
      yandexPaySupport: false,
  }, {
      appearance: {
        colors: {
          primaryButtonColor: "#2E71FC",
          primaryButtonTextColor: "#FFFFFF",
          primaryHoverButtonColor: "#2E71FC",
          primaryButtonHoverTextColor: "#FFFFFF",
          activeInputColor: "#0B1E46",
          inputBackground: "#FFFFFF",
          inputColor: "#8C949F",
          inputBorderColor: "#E2E8EF",
          errorColor: "#EB5757"
        },
        borders: {
          radius: "8px"
        }
      },
      components: {
        paymentButton: {
          text: "Оплатить",
          fontSize: "16px"
        },
        paymentForm: {
          labelFontSize: "16px",
          activeLabelFontSize: "12px",
          fontSize: "16px"
        }
      }
  });
  blocksApp.mount(document.getElementById("payBlock"));

  blocksApp.on("destroy", () => {
      console.log("destroy");
  });
  blocksApp.on("success", (result) => {
      console.log("success", result);
  });
  blocksApp.on("fail", (result) => {
      console.log("fail", result);
  });
}

export function PayComponent() {
    return {
        
    }
}