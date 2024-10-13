import {
    Body,
    Container,
    Font,
    Head,
    Hr,
    Html,
    Img,
    Preview
} from "@react-email/components";
import { format } from "date-fns";

export default function TargetMarketingEmail({
  data,
  message,
}: {
  data: any[];
  message: string;
}) {
  return (
    <Html>
      <Head>
        <title>LCRTel</title>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Verdana"
          fontStyle="normal"
        />
      </Head>
      <Preview>Target rates!</Preview>
      <Body style={{ backgroundColor: "#F9FAFB" }}>
        <Container
          style={{
            marginTop: "32px",
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Hr
            style={{
              backgroundColor: "#0038a7",
              margin: "0",
              height: "6px",
              width: "100%",
              borderRadius: "4px 4px 0 0",
            }}
          />
          <Img
            style={{ margin: "32px auto", display: "block" }}
            src="https://www.lcrtel.com/lcrtelcom_logo-01.png"
            width="180"
            alt="LCRTel"
          />
          <div
            style={{
              padding: "0px 20px",
            }}
          >
            <p style={{ fontWeight: "500", color: "#6B7280" }}>{message}</p>
            <table
              style={{
                color: "#0038a7",
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F8FAFC",
                      padding: "0px 8px",
                      textAlign: "left",
                    }}
                  >
                    Destination
                  </th>
                  <th
                    style={{
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F8FAFC",
                      padding: "0px 8px",
                      textAlign: "left",
                    }}
                  >
                    Prefix
                  </th>
                  <th
                    style={{
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F8FAFC",
                      padding: "0px 8px",
                      textAlign: "left",
                    }}
                  >
                    Rate $
                  </th>
                  <th
                    style={{
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F8FAFC",
                      padding: "0px 8px",
                      textAlign: "left",
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F8FAFC",
                      padding: "0px 8px",
                      textAlign: "left",
                    }}
                  >
                    ASR%
                  </th>
                  <th
                    style={{
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F8FAFC",
                      padding: "0px 8px",
                      textAlign: "left",
                    }}
                  >
                    ACD
                  </th>
                  <th
                    style={{
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F8FAFC",
                      padding: "0px 8px",
                      textAlign: "left",
                    }}
                  >
                    Posted on
                  </th>
                  <th
                    style={{
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F8FAFC",
                      padding: "0px 8px",
                      textAlign: "left",
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((target, idx: number) => (
                  <tr key={idx}>
                    <td
                      style={{
                        border: "1px solid #E5E7EB",
                        padding: "0px 8px",
                        fontWeight: "500",
                      }}
                    >
                      {target.destination}
                    </td>
                    <td
                      style={{
                        border: "1px solid #E5E7EB",
                        padding: "0px 8px",
                        fontWeight: "500",
                      }}
                    >
                      {target.destination_code}
                    </td>
                    <td
                      style={{
                        border: "1px solid #E5E7EB",
                        padding: "0px 8px",
                      }}
                    >
                      {target.buying_rate}
                    </td>
                    <td
                      style={{
                        border: "1px solid #E5E7EB",
                        padding: "0px 8px",
                        textTransform: "uppercase",
                      }}
                    >
                      {target.route_type}
                    </td>
                    <td
                      style={{
                        border: "1px solid #E5E7EB",
                        padding: "0px 8px",
                      }}
                    >
                      {target.asr}%
                    </td>
                    <td
                      style={{
                        border: "1px solid #E5E7EB",
                        padding: "0px 8px",
                      }}
                    >
                      {target.acd}
                    </td>
                    <td
                      style={{
                        border: "1px solid #E5E7EB",
                        padding: "0px 8px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {target.created_at &&
                        format(new Date(target.created_at), "dd/MM/yyyy")}
                    </td>
                    <td
                      style={{
                        border: "1px solid #E5E7EB",
                        padding: "0px 8px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <a
                        href={`https://www.lcrtel.com/user/targets/${target.id}`}
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontWeight: "500", color: "#6B7280" }}>
              For your convenience, we have attached an Excel file containing
              the details of all target rates.
            </p>

            <p
              style={{
                marginBottom: "20px",
                fontWeight: "500",
                color: "#6B7280",
              }}
            >
              Best regards, The LCRTel Team 🚀
            </p>
          </div>
        </Container>
        <Container>
          <p
            style={{
              margin: "32px 0",
              textAlign: "center",
              fontSize: "12px",
              fontWeight: "500",
              color: "#6B7280",
            }}
          >
            &copy; 2024 (1446 AH) LCRTel, All Rights Reserved
          </p>
        </Container>
      </Body>
    </Html>
  );
}
