import type { NextAuthConfig } from 'next-auth';
import Cookies from 'js-cookie';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      const isOnDashboard = nextUrl.pathname.startsWith('/profile');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/profile', nextUrl));
      }
      return true;
    },
    signIn(user) {
      console.log('Usuário logado:', user);
    
      try {
        // Salvar as informações do usuário em um cookie após o login
        Cookies.set('user', JSON.stringify(user), { expires: 7, path: '/' });
        console.log('Cookie definido:', Cookies.get('user'));
      } catch (error) {
        console.error('Erro ao definir cookie:', error);
      }
      
      return true;
    },
    
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;