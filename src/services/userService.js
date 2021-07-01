import httpInterceptor from '../network/interceptor';

const UserService = {

    submitGetUser: async () => {
        const URL = 'https://randomuser.me/api';
        const response = await httpInterceptor({
          url: URL,
          method: 'GET'
        });
    
        if (response.ok) {
          const data = await response.json();
          return data;
        }
        throw new Error(response);
      },
};
export default UserService;
