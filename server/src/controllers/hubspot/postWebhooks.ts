import config from "../../config";
import axios from "axios";

import { Request, Response } from "express";

const postWebhooks = async (req: Request, res: Response): Promise<any> => {
  console.log("📬 Webhook received from HubSpot:");
  console.log("🧠 User-Agent:", req.headers["user-agent"]);
  // console.log(JSON.stringify(req.body, null, 2));

  const changes = req.body;
  for (const change of changes) {
    const { objectId, propertyName, propertyValue } = change;
    console.log(objectId, propertyName, propertyValue);

    if (propertyName === "simplyfi_hub_company_id") {
      console.log("1. hubspot update company_id");
      console.log("2. give hubspot latest expiry date");

      const expired_dates = ["2020-01-01", "2021-01-01", "2022-01-01", "2023-01-01"];
      const index = Number(propertyValue ? propertyValue : "not number");
      const expired_date = expired_dates[index];

      const access_token = config.hubspot.private.accessToken;
      await axios.patch(
        `https://api.hubapi.com/crm/v3/objects/companies/${objectId}`,
        {
          properties: {
            simplyfi_hub_expired_date: expired_date ? expired_date : "",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (propertyName === "simplyfi_hub_expired_date") {
      console.log("1. hubspot update expired_date");
      console.log("2. update our own database");
    }
  }

  res.status(200).send("Webhook received");
};

export default postWebhooks;
