import { useSession } from "@/hooks/useSesssion";
import privateApi from "@/lib/axios-interceptor";
import { SignInCredentials, SignUpCredentials } from "@/schema/schema";
import axios, { AxiosError } from "axios";

export const signUpService = async (signUpPayload: SignUpCredentials) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, signUpPayload)
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Sign up failed")
    }
    throw new Error("Something went wrong")
  }
}

export const signInService = async (signInPayload: SignInCredentials & { rememberMe: boolean }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, signInPayload, {
      withCredentials: true
    })
    const { accessToken, user, message } = response.data;
  
    const mappedUser = {
      displayName: user.displayName,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl
    }
  
    useSession.setState({
      accessToken,
      user: mappedUser
    })
  
    return {message}
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Sign in failed")
    }
    throw new Error("Something went wrong")
  }
}

export const loginWithGoogleService = async (payload: { name: string; email: string; image: string }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-google`, payload, {
      withCredentials: true
    })
    const { accessToken, user, message } = response.data;
  
    const mappedUser = {
      displayName: user.displayName,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl
    }
  
    useSession.setState({
      accessToken,
      user: mappedUser
    })
  
    return {message}
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Google login failed")
    }
    throw new Error("Something went wrong")
  }
}

export const verifyService = async (payload: { token: string }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
      payload
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Verify failed");
    }
    throw new Error("Something went wrong");
  }
};

export const resendVerifyService = async (payload: { email: string }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verify`,
      payload
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Resend verification failed");
    }
    throw new Error("Something went wrong");
  }
};

export const forgotPasswordService = async (payload: { email: string }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      payload
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Forgot password failed");
    }
    throw new Error("Something went wrong");
  }
};

export const resetPasswordService = async (payload: { token: string; password: string }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      payload
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Reset password failed");
    }
    throw new Error("Something went wrong");
  }
};

export const logoutService = async () => {
  try {
    const response = await privateApi.post(
      `/auth/logout`,
      {},
      { withCredentials: true }
    );

    useSession.setState({
      accessToken: null,
      user: null,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Logout failed");
    }
    throw new Error("Something went wrong");
  }
};
