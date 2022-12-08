export const getPublicKey = () => {
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    return 'pk_test_XMEN2RYVp2gz0oe2Tkdnqyzs00vfPlL5tJ';
  } else {
    return 'pk_live_51LytrtDypU7oORCn4irmuJVbd45SPBQcVwoLAfsAwbfwbMTCmk7Sb3UDFvv2e1ZaMIcoS5B9FQUWXKRyLTxLcdJy00Z2fGN3hN';
  }
};
