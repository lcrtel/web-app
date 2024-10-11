import {
    Body,
    Container,
    Font,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
const surfaceColor = "#EEF5FB";
const brandColor = "#276DB4";
const gray = "#6b7280";
const red = "#ef4444";
export default function LoginCredentialsUpdate({ user }: { user: any }) {
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
        <Preview>Your Login Credentials Has Been Updated</Preview>
        <Body style={{ backgroundColor: surfaceColor }}>
          <Container
            style={{
              backgroundColor: "#fff",
              borderRadius: "6px",
              marginTop: "8px",
            }}
          >
            <Hr
              style={{
                height: "6px",
                width: "100%",
                backgroundColor: brandColor,
                borderRadius: "6px 6px 0 0",
                margin: "0",
              }}
            ></Hr>
            <Section
              style={{
                margin: "0 auto",
                width: "90%",
                maxWidth: "90%",
              }}
            >
              <Img
                src="https://lh3.googleusercontent.com/fife/AKsag4OcMTjzbyBhu1UDQgtjRueER2qtmRDsxFklcGNweRGOaITvrfe74cbZBVSwbgV4C1OK0XWUWHrfhlB9K8wj_IbTEgkci53IHzzPKg9TZtjr23h6llkrBNQWeOXChZyfnEFLDrkGqj1uuq0omRzNsDhw6GBqEM5XdS1hHnjdGNr-fkkYnNhOWHH26Av1D9V_VrASSUQ4sCbhEbr7_ch3MpcYk8qm8fs9dcPwfvGSCJugohL5fN6Fxp4OMbRRNQSJmqe9FUHibSFsuWhugWH8b4hCVJw_9wgc39tapw_EXgESUJm_2E8FhXDrQdZMQyXjTGCcvXvrpCspv_cgaF-dYNhP1xTSS-9zU4A-y37QXBJsVsiUyF15z8DC6XZIYqcRx0rYlFrzJ3HhLSS438KFvwR3Kex5p2WPaUkteouhfHeEnt0jz3nwZbVz5G2eCjhXae2Fo6HJrKxqgtGVVQB0nwBUrjrZMa7cct4aZWGE1jurYzBj-uuwCGPmxwUUj5B-kVW5SW1sq4FHkmIjJxgJsYE_OxHN0EXJH1OqDAwfrxNknVKtZZwfJNJhFxfrnH82uyYxH9fBTFj9GwtHuQOHqkN_OeIhl8hFq-Ju2r_e7SkaSN8IzvAgkz_9G-ZECaF91ZCCHXtRVAKwYX7kXyKhpaoPiHpPe8VtcYC5bOFVcsfAiDTdDXH0FgOQY-J6VM0qQ0bMDYk3jekv7Q8CPaboI7DOQs-wGIfVfWny9vWXWak_YG6p2MOysQ9nu-MRurHPkIILfXmP1sRLspeWoObMv9C05zUBwiyok7VG_EqfsuQz0Azi-EPFVlVQ68xW69R5SyY4kQe6SWmtKxiEcFgLwGo1mgI7tfiCgqkFSEAEtn_bulZqZRAkILRbpzbEf-wAIrwktE1itDEk0xPuOtsVxouMhlPIt69LTEmEaDDzzCeSy1lc7NCNJlAxGx5XSsJazlnu2ntj94rZpY_dDCuCP4wIqyM8vglvSDQvmyF4aya5K1y4assFPCXVrU3L17sTCBVfMh7bkr1fwmtrP5SBRAG1K3_agY4uAF_jyKu7j_basPctUPolUnhDL2JIhH6WJkMz6q5jYuvZfRogIWYLQ0AZpPPjiD2akej4FdqSmJMzxcmcmHrSQ-i3KlJnteKwo_Gp50-qgGi-D3xZIiTK7KdYBs2WPWVbHVmu2lRnIvFfsNkY0EhmzTi1y4rxNnMSnS1ll0I8-K0Nx2FDx2pZenFbN7scsBtviMSVdwNg0roB7YO62CQkVLT2P8rCnIH6BeUlApZuVAwd2l4eoOOslCylOsLRykpm18iAFKAqbVcbUqm4MMErCIfXLTBo4_Ic6i_J8gDWbTo3lBLHviOX1DFhMB0SJOKRjKXKfpFAf2GBnK-wUDecyWCTAzRxA9qwZO8RuWRiabq_Gk-uObob9mnV1sF4ugZFdJko5m4cLNrn7xaiXB5m182ip-it2uEglLf28rcKIkWb9T-WenFMWDsGNvQ-OptsQxqLve4ZesBYTiZqNOtQUsU7dx4Cw18le5yE9BSUBpBmEZ4uac9SEVXN9aJ4_vbPyO3bPf23g70=w3840-h1924"
                width="180"
                style={{
                  display: "block",
                  margin: "32px auto",
                }}
                alt="LCRTel"
              />
            </Section>
            <Section
              style={{
                margin: "0 auto",
                width: "90%",
                maxWidth: "90%",
              }}
            >
              <Text
                style={{
                  color: brandColor,
                  marginTop: "24px",
                  fontWeight: "bold",
                  letterSpacing: "tight",
                  fontSize: "1.25rem",
                }}
              >
                Your Login Credentials Has Been Updated
              </Text>
              <Text
                style={{
                  color: brandColor,
                  fontWeight: "normal",
                }}
              >
                Dear {user?.name},
              </Text>
              <Text
                style={{
                  color: brandColor,
                  fontWeight: "500",
                }}
              >
                We hope this email finds you well. This is to inform you that
                your login credentials has been updated by our administrator.
                Below are the details of the recent changes:
              </Text>
            </Section>
            <Section
              style={{
                margin: "0 auto",
                width: "90%",
                maxWidth: "90%",
              }}
            >
              <Text
                className="m-0 font-medium text-gray-500"
                style={{
                  color: gray,
                  fontWeight: "500",
                }}
              >
                Email Address:{" "}
                <span
                  style={{
                    color: brandColor,
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  {user?.email}
                </span>
              </Text>
              {user?.password && (
                <>
                  <Text
                    style={{
                      color: gray,
                      fontWeight: "500",
                    }}
                  >
                    Temporary Password:{" "}
                    <span
                      style={{
                        color: brandColor,
                        fontWeight: "600",
                        fontSize: "18px",
                      }}
                    >
                      {user?.password}
                    </span>
                  </Text>
                  <Text
                    style={{
                      color: red,
                      fontWeight: "600",
                      margin: 0,
                    }}
                  >
                    Please note that the password provided is temporary. We
                    recommend logging in with the temporary password and
                    changing it immediately to enhance the security of your
                    account. To update your password, follow this link after
                    logging in:{" "}
                    <Link href="https://www.lcrtel.com/?update_password=true">
                      Update Password
                    </Link>
                  </Text>
                </>
              )}
            </Section>
            <Section
              style={{
                margin: "0 auto",
                width: "90%",
                maxWidth: "90%",
              }}
            >
              <Text
                style={{
                  color: brandColor,
                  fontWeight: "500",
                }}
              >
                Please ensure the security of your credentials and refrain from
                sharing them with anyone. You can utilize this information to
                log in to your LCRTel.com account.
              </Text>
              <Text
                style={{
                  color: brandColor,
                  fontWeight: "500",
                }}
              >
                Should you have any queries or require assistance, please don't
                hesitate to contact our dedicated support team. We're committed
                to providing you with the assistance you need.
              </Text>
              <Text
                style={{
                  color: brandColor,
                  fontWeight: "500",
                }}
              >
                If you encounter any issues or have questions regarding this
                update, please don't hesitate to contact our support team at
                lcrtelweb@gmail.com. We are here to assist you.
              </Text>
              <Text
                style={{
                  color: gray,
                  marginBottom: 0,
                }}
              >
                Thank you for your cooperation.
              </Text>
              <Text
                style={{
                  color: gray,
                  marginBottom: "20px",
                  fontWeight: "500",
                }}
              >
                Warm regards, The LCRTel Team
              </Text>
            </Section>
          </Container>
          <Container>
            <Text
              style={{
                color: gray,
                textAlign: "center",
                fontWeight: "500",
                fontSize: "12px",
                marginTop: "32px",
                marginBottom: "32px",
              }}
            >
              &copy; 2023 (1445 AH) LCRTel, All Rights Reserved
            </Text>
          </Container>
        </Body>
      </Html>
    );
}
