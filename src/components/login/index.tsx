import { Button, Checkbox, Form, Input, Typography } from "antd";
import { Lock } from "react-bootstrap-icons";
import LogoWithoutText from "@assets/svgs/jarvis-logo-without-text.svg";
import { Controller, useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@src/api/auth.api";
import { setToken } from "@src/utils/auth";
import { useAppStore } from "@src/store";
import { useNavigate } from 'react-router-dom';
const { Text, Title } = Typography;

const Login = () => {
   const { handleSubmit, control } = useForm();
   const navigate = useNavigate()
   const authorize = useAppStore((state) => state.authorize);
   const { mutate: loginMutate } = useMutation({
      mutationFn: loginApi,
      onSuccess: (response) => {
         if (response.status === 201) {
            console.log(response.data);
            setToken(response.data.access_token);
            const currentUser = {
               id: response.data.user.id,
               email: response.data.user.email,
               accessToken: response.data.token,
            };
            authorize(currentUser);
            navigate("/dashboard");
         }
      },
   });

   const onSubmit = (data) => {
      loginMutate(data);
   };

   return (
      <div className="w-96">
         <div className="mb-5 flex justify-center items-center w-full flex-col">
            <Title level={2}>Welcome Back !</Title>
            <Text type="secondary">Sign in to continue to Jarvis Admin</Text>
         </div>
         <Form
            name="normal_login"
            initialValues={{
               remember: true,
            }}
            onFinish={handleSubmit(onSubmit)}
            layout="vertical"
            requiredMark="optional">
            <Form.Item name="email">
               <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Type your email here" />}
               />
            </Form.Item>
            <Form.Item name="password">
               <Input.Password
                  prefix={<Lock style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Password"
               />
            </Form.Item>
            <Form.Item>
               <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
               </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
               <Button block={true} type="primary" htmlType="submit">
                  Login
               </Button>
               <Button className="flex justify-center items-center gap-2 mt-3" block={true} type="default">
                  <img src={LogoWithoutText} width={20} height={20} /> Jarvis
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
};

export default Login;
