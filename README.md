# Banckrypto.com wallet and explorer (front end)
This is the wallet and block explorer front end that you can run on your NGINX or APACHE etc. webserver.
Just update the ENV file in case you want to connect to your dedicated banckrypto node.
The native currency is EURx. See a live interaction with the EURx network via the website banckrypto.com.

# About Banckrypto.com
This crypto wallet is the first hybrid blockchain bank wallet. You can transfer your EURx currency via the blockchain but you can also buy/sell trade it on cointopay.com. It is a stable currency which is being sold for one Euro per coin, however it has a limited supply of 100000000 units and can be traded on reflextrader.com. You can also import your EURx and send it via your verified bank account. You may also download this wallet and run it yourself. Welcome to the decentralized future!

## Project setup
If you are planning to run your own Banckrypto backend as well please update the .env settings file first.
Backend: https://github.com/Cointopay/BanckryptoNode
Before you can run the below commands, first install:
https://nodejs.org/en/download/ and then open a new command prompt for npm to install yarn:
npm install -g yarn

```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```
after this move the "dist" folder contents to your webserver and load the main url
NOTE: if you use NGINX make sure to add this configuration, which means if the URI is not found then revert back to the index.html.
location / {
  try_files $uri $uri/ /index.html;
}

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## About Cointopay.com
We are an international crypto currency payment processor, meaning that we accept payments from your customers and make the funds available to you (incl. in form of fiat currency like euro). Delivering a seamless payment experience while underlying dealing with diverse and complex blockchain technologies like EURx. P.S. If you want your own crypto currency, we can provide that for you as well, Cointopay has been a technological payment incubator since 2014!

## Licensing statement from Cointopay.com
You may run this software for the purpose of participating in the Banckrypto EURx network. To protect the network Cointopay acts as the guardian of the software to make a statement that it is not allowed to do anything else then what it was intended for without prior consent of Cointopay.com. It is not allowed to reverse engineer or copy any of the software traits used in this software and network. One of its primary reasons to exist is act as a payment network with maximum benefit to it's users, being zero transfer fee, near instant and with limited supply. It is intended to be used in a banking like environment to enable transactions that benefits its participants. You may not cause harm to the functioning network by any means and you are envited to grow the network and it's functionality (also on github). There is currently no similar public network available. Please log an issue in case you have any questions or want to participate.

