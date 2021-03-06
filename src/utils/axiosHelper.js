
import axios from 'axios';
import i18next from 'i18next';

const gatewayUrl = ' http://localhost:5000/rockets';

export default {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.get['x-api-key'] = 'API_KEY_1';

    axios.interceptors.request.use(
      (config) => {
 

        config.url = gatewayUrl.concat(config.url);

        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      (response) => {
        if (response.data && (response.data.ErrorCode || response.data.Error)) {
          let errorMessageDetail = '';

          if (response.data.ErrorCode || response.data.Error) {
            const errorCode = response.data.ErrorCode ?? '';
            const error = response.data.Error ?? '';

            errorMessageDetail += errorCode + error;
          }

          if (
            response.data.ErrorObjectList &&
            response.data.ErrorObjectList.length > 0
          ) {
            response.data.ErrorObjectList.map((err) => {
              const errorCode = err.Error.ErrorCode ?? '';
              const error = err.Error.Error ?? '';

              errorMessageDetail += errorCode + error;
            });
          }
          toast(i18next.t(errorMessageDetail), {
            pauseOnFocusLoss: false,
          });
        }

        return response;
      },
      (err) => {
        console.error('Unexpected error');

        let errorMessageDetail = '';

        if (err.response && err.response.status) {
          errorMessageDetail += err.response.status;
        }

        toast(i18next.t(errorMessageDetail), {
          pauseOnFocusLoss: false,
        });

        return err;
      },
    );
  },

};
