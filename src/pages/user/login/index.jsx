import { Alert, Checkbox, Icon, message, notification } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
const { Tab, Email, Password, Submit, Mobile, Captcha } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  loginForm = undefined;
  state = {
    type: 'login',
    autoLogin: true,
  };
  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };
  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      if (type == 'login') {
        dispatch({
          type: 'login/login',
          payload: { ...values, type },
          callBack: (status, msg) => {
            if (!status) {
              notification.error({
                message: '登陆失败',
                description: msg,
                duration: 5,
              });
            }
          },
        });
      } else if (type == 'registe') {
        dispatch({
          type: 'login/registe',
          payload: { ...values, type },
          callBack: (status, msg) => {
            if (status) {
              this.loginForm.resetFields();
              notification.success({
                message: '注册成功',
                duration: 5,
              });
            } else {
              notification.error({
                message: '注册失败',
                description: msg,
                duration: 5,
              });
            }
          },
        });
      }
    }
  };
  onTabChange = type => {
    this.setState({
      type,
    });
  };
  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['email'], {}, async (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;

          try {
            const success = await dispatch({
              type: 'login/getCaptcha',
              payload: values.email,
            });
            resolve(!!success);
          } catch (error) {
            reject(error);
          }
        }
      });
    });

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="login" tab={'登陆'}>
            <Email
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱地址',
                },
                {
                  pattern: /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/,
                  message: '邮箱格式错误',
                },
              ]}
            />
            <Password
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();

                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Tab key="registe" tab={'注册'}>
            <Email
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱地址',
                },
                {
                  pattern: /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/,
                  message: '邮箱格式错误',
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder={'验证码'}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={'获取验证码'}
              getCaptchaSecondText={'秒'}
              rules={[
                {
                  required: true,
                  message: '输入验证码',
                },
              ]}
            />
            <Password
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();

                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          {/* <Tab key="mobile" tab={'手机登陆'}>
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: 'user-login.login.message-invalid-verification-code',
                }),
              )}
            <Mobile
              name="mobile"
              placeholder={''}
              rules={[
                {
                  required: true,
                  message: '输入手机号',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '格式错误',
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder={'验证码'}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({
                id: 'user-login.form.get-captcha',
              })}
              getCaptchaSecondText={formatMessage({
                id: 'user-login.captcha.second',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.verification-code.required',
                  }),
                },
              ]}
            />
          </Tab> */}
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              记住我
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              忘记密码
            </a>
          </div>
          <Submit loading={submitting}>{type === 'login' ? '登陆' : '注册'}</Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
