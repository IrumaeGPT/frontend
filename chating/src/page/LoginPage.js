import './LoginPage.css'

function LoginHeader(){
    return(
        <div className='loginheader'>
            <h5 style={{fontSize:"25px", fontWeight:"200"}}>WELCOME</h5>
            <h2 style={{fontSize:"35px", fontWeight:"900", color:"#004094"}}>이루매GPT</h2>
        </div>
    )
}

function LoginBox(){

    function LoginBar(){
        return(
            <div className='loginbar'>
                <input type='text' placeholder="아이디">

                </input>
                <input style={{marginTop:"30px"}} type='password' placeholder="비밀번호">

                </input>
            </div>
        )
    }

    function CustomButton(props){

        const buttonStyleDetail = {
            color : props.color,
            backgroundColor : props.backGroundColor,
        }

        return(
            <div className='custombutton'>
                <button style={buttonStyleDetail}>{props.content}</button>
            </div>
        )
    }

    function LoginButtons(){
        return(
            <div className='loginbuttons'>
                <CustomButton backGroundColor="#004094" content="로그인" color="white"></CustomButton>
                <CustomButton backGroundColor="white" content="회원가입" color="black"></CustomButton>
                <div className='searchidpassword'>
                    <h2>아이디 비밀번호 찾기 →</h2>
                </div>
            </div>
        )
    }

    return(
        <div className="loginbox">
            <LoginBar></LoginBar>
            <LoginButtons></LoginButtons>
        </div>
    )
}

function LoginPage(){
    return(
        <div className="containor">
            <div className='cotainorelement'>
                <LoginHeader></LoginHeader>
                <LoginBox></LoginBox>
            </div>
        </div>
    )
}

export default LoginPage