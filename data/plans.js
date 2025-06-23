export const plans = {
  link:
    process.env.NODE_ENV === "development"
      ? "https://buy.stripe.com/test_14A00k0CO2QD7Uj7sa5kk00"
      : "https://buy.stripe.com/14A00k0CO2QD7Uj7sa5kk00",
  priceId:
    process.env.NODE_ENV === "development"
      ? "price_1RcpcVLAoWJiyk4oJvTeUSBq"
      : "price_1Rd5IpLAoWJiyk4o1lp1fu1u",
};
