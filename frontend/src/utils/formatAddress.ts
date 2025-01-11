export const formatAddress = (address: string, keyword: string): string | undefined => {
  const addressList = address.split(' ');

  const foundAddress = addressList.find((address: string) => {
    if (address.at(-1) === keyword) {
      return address;
    }
  });

  return foundAddress;
};
