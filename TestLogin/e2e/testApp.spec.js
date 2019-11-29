const data = require('./testData');
const { takeScreenshot } = require('./screenshot');

describe('Test App', () => {
    it('01- Hiển thị header, logo, home khi vào App', async () => {
        await expect(element(by.id('header'))).toBeVisible();
        await expect(element(by.id('logo'))).toBeVisible();
        await expect(element(by.id('home'))).toBeVisible();
    });
    it('02- Vào màn hình Login khi bấm vào đăng nhập', async () => {
        await element(by.id('tap-login')).tap();
        await expect(element(by.id('form-login'))).toBeVisible();
    })
    it('03- Vào màn hình Sign up khi bấm vào đăng ký', async () => {
        await tapToHome();
        await element(by.id('tap-signup')).tap();
        await expect(element(by.id('form-signup'))).toBeVisible();
    })

    describe('Test Sign up', () => {
        it('04- Hiển thị đầy đủ các trường trong form sign up', async () => {
            await reLoad();
            await showSignupForm();
        })
        it('05- Hiển thị Sign up thất bại với username và password không hợp lệ', async () => {
            await signup(data.Signup_InvalidAccount);
            await waitFor(element(by.id('validation-message-signup'))).toHaveText('Tài khoản và mật khẩu phải từ 5 đến 20 kí tự và chỉ chứa chữ và số, họ tên từ 3 đến 50 ký tự').withTimeout(1000);
        })
        it('06- Hiển thị Sign up thất bại với username, password, fullname hợp lệ nhưng username đã tồn tại', async () => {
            await signup(data.Signup_UsernameAlreadyExist);
            await waitFor(element(by.id('validation-message-signup'))).toHaveText('Tài khoản này đã tồn tại').withTimeout(3000);
        })
        it('07- Hiển thị trang đã đăng nhập sau khi sign up với username, password, fullname hợp lệ', async () => {
            await signup(data.Signup_ValidAccount);
            await waitFor(element(by.id('home-logged'))).toBeVisible().withTimeout(3000);
        })
    })

    describe('Test Login', () => {
        it('08- Hiển thị đầy đủ các trường trong form login', async () => {
            await reLoad();
            await showLoginForm();
        })
        it('09- Hiển thị Login thất bại với username và password nhỏ hơn 5 ký tự hoặc chứa ký tự đặc biệt', async () => {
            await login(data.Login_InvalidAccount);
            await waitFor(element(by.id('validation-message-login'))).toHaveText('Tài khoản và mật khẩu phải từ 5 đến 20 kí tự và chỉ chứa chữ và số').withTimeout(1000);
        })
        it('10- Hiển thị Login thất bại với username không tồn tại', async () => {
            await login(data.Login_UserNotFound);
            await waitFor(element(by.id('validation-message-login'))).toHaveText('Tài khoản không tồn tại').withTimeout(1000);
        })

        it('11- Hiển thị Login thất bại với username và password hợp lệ nhưng sai mật khẩu', async () => {
            await login(data.Login_WrongPassword);
            await waitFor(element(by.id('validation-message-login'))).toHaveText('Mật khẩu không chính xác').withTimeout(3000);
        })
        it('12- Hiển thị trang đã đăng nhập sau khi Login thành công với username và password đã tạo', async () => {
            await login(data.Signup_ValidAccount);
            await waitFor(element(by.id('home-logged'))).toBeVisible().withTimeout(3000);
        })
    });
    describe('Test Chat', () => {
        it('13- Đăng nhập và tap Vào phòng chat, hiển thị màn hình tin nhắn và phần nhập, gửi tin nhắn', async () => {
            await reLoad();
            await showLoginForm();
            await login(data.Signup_ValidAccount);
            await waitFor(element(by.id('home-logged'))).toBeVisible().withTimeout(3000);
            await element(by.id('btn-join-chat')).tap();
            await waitFor(element(by.id('view-chat'))).toBeVisible().withTimeout(1000);
            await expect(element(by.id('input-message'))).toBeVisible();
            await expect(element(by.id('btn-send-message'))).toBeVisible();
        })
        it('14- Hiển thị tin đã nhắn sau khi nhập tin nhắn và gửi', async () => {
            await element(by.id('input-message')).replaceText(data.message);
            await element(by.id('btn-send-message')).tap();
            await waitFor(element(by.text(data.message))).toBeVisible().withTimeout(3000);
        })
    })
    afterEach( async () => {
        takeScreenshot();
    });
});

const showLoginForm = async () => {
    await element(by.id('tap-login')).tap();
    await waitFor(element(by.id('form-login'))).toBeVisible().withTimeout(1000);
    await expect(element(by.id('input-username-login'))).toBeVisible();
    await expect(element(by.id('input-password-login'))).toBeVisible();
    await expect(element(by.id('btn-login'))).toBeVisible();
}
const showSignupForm = async () => {
    await element(by.id('tap-signup')).tap();
    await waitFor(element(by.id('form-signup'))).toBeVisible().withTimeout(1000);
    await expect(element(by.id('input-fullname-signup'))).toBeVisible();
    await expect(element(by.id('input-username-signup'))).toBeVisible();
    await expect(element(by.id('input-password-signup'))).toBeVisible();
    await expect(element(by.id('btn-signup'))).toBeVisible();
}
const login = async (value) => {
    await element(by.id('input-username-login')).replaceText(value.username);
    await waitFor(element(by.id('input-username-login'))).toHaveText(value.username).withTimeout(500);
    await element(by.id('input-password-login')).replaceText(value.password);
    await waitFor(element(by.id('input-password-login'))).toHaveText(value.password).withTimeout(500);
    await element(by.id('btn-login')).tap();
}
const signup = async (value) => {
    await element(by.id('input-fullname-signup')).replaceText(value.fullname);
    await waitFor(element(by.id('input-fullname-signup'))).toHaveText(value.fullname).withTimeout(500);
    await element(by.id('input-username-signup')).replaceText(value.username);
    await waitFor(element(by.id('input-username-signup'))).toHaveText(value.username).withTimeout(500);
    await element(by.id('input-password-signup')).replaceText(value.password);
    await waitFor(element(by.id('input-password-signup'))).toHaveText(value.password).withTimeout(500);
    await element(by.id('btn-signup')).tap();
}
const tapToHome = async () => {
    await element(by.id('tap-to-home')).tap();
}
const reLoad = async () => {
    await device.reloadReactNative();
}