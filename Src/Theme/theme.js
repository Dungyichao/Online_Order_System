import styled from 'styled-components';



const headerHeight = 65;
const borderColor = 'rgba(0,0,0,0.07)';
const containerMaxwidth = 900;




export const AppWrapper = styled.div `
    
`;

export const Main = styled.div `
     
`;

export const Footer = styled.div `
    border-top: 1px solid ${borderColor};
    padding 10px 0;
`;

export const HeaderWrapper = styled.div `
   min-height: 80px;  
   
`;

////backgroundColor:"#2F4F4F"

export const HeaderTitle = styled.div `
    font-size: 30px;
    font-weight: 800;
    
    
    text-align: center;
    background-color: #2F4F4F;
    color: #F8F8FF;
    position: fixed;
    left: 0.01%;
    right: 0.01%; 
`;

export const Header = styled.div `  
    border-bottom: 1px solid ${borderColor};       
`;

export const HeaderUserMenu = styled.div `
    width: 50px;
    display: flex;
    align-items: center;
`;

export const HeaderUserAvatar = styled.img `
    border-radius: 50%;
    width: 30px;
    height: 30px;
`;

export const Container = styled.div `
    max-width: ${containerMaxwidth}px;
    margin: 0 auto;
`;



export const Copyright = styled.p `
    font-size: 12px;
    text-align: center;
`;



export const LiveWrapper = styled.div `
    
`;

export const HomeWrapper = styled.div `
    
`;

export const DailyformWrapper = styled.div `
    display: flex;
    flex-direction: column;   
`;

export const TestformWrapper = styled.div `
    display: flex;
    flex-direction: column;   
`;

export const TestFormItem = styled.div `
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;



export const ConsoleWrapper = styled.div `
    display: flex;
    flex-direction: row;   
    height: 700px;
    
`;

export const MenuWrapper = styled.div `
    display: flex;
    flex-direction: column;   
    background-color: #408dbf;
    flex: 1;
    margin: 5px;
    
`;



export const ConsoleinfoWrapper = styled.div `
    display: flex;
    flex-direction: column; 
    flex: 5;
    margin: 0;
    background: #F0F8FF;
    padding: 0;
    max-width: 700px;
`;

export const SumCardsWrapper = styled.div `
    display: flex;
    flex-direction: row; 
    background: #F0F8FF;
    padding: 3px;
    max-width: 700px;   
    {/*margin:"10px 0 0 0"*/}
    {/*textAlign: center;*/}
    justify-content: center;
`;

export const SumCardWrapper = styled.div `
    margin: 3px 3px;
    min-width: 150px;
    {/*height: 120px;*/}
    border-style: outset;
    border-radius: 15px;
    
`;

export const Menubotton = styled.button `  
    border: none;
    height:70px;
    padding: 5px 15px;
    background: #0378bb;
    color: #F5F7F8;
    margin: 3px 3px;
    
`;

export const PersonWrapper = styled.div `
    margin-bottom: 3px;   
    display: flex;
    flex-direction: row;
    background: #5A9EC5;
`;

export const SummaryWrapper = styled.div `
    {/*margin-bottom: 3px;   */}
    display: flex;
    flex-direction: column;
    background: #3AA2C3;
    height: 170px;
    border-radius: 15px;
`;

export const SummaryinfoWrapper = styled.div `   
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 15px;
`;

export const SummaryTitleWrapper = styled.div `
    color: #99DC9A;
    font-weight: 700;
`;
//1273DE
//76CC8A

export const SummaryValueWrapper = styled.div `
    margin-top: 2px;
    margin-bottom: 1px;
    color: #F5F5F7;
`;

export const TitleBarWrapper = styled.div `
    margin-bottom: 3px;   
    display: flex;
    flex-direction: row;
    background: #037DC2;
    height: 60px;
    padding: 0 15px 0 0;
`;

export const TitleBarItem = styled.label `
    margin: 3px 3px;   
    color: #E9F1F5;   
    background: #0599EE;
`;




export const PersonItem = styled.label `
    margin: 3px 3px;   
    color: #E9F1F5;
    
    background: #70BDE9;
`;

export const SearchItem = styled.div `
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
`;

export const SearchForm = styled.form `
`;

export const SearchInput = styled.input `
    margin-right: 10px;
    width: 150px;
     
     padding: 5px 5px;
`;


export const Form = styled.form `
    padding: 20px 15px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
`;


export const FormItem = styled.div `
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;



export const FormLabel = styled.label `
     font-weight: 600;
     background-color: #008080;
     color: #F8F8FF;
     margin-bottom: 3px;
     padding-left: 3px;
     padding-bottom: 1px;
`;

export const NoneLabel = styled.label `
     font-weight: 800;
     color: #FF0000;
`;


export const FormInput = styled.input `
     border: 1px solid rgba(0,0,0.06);
     padding: 5px 15px;
`;

export const FormAction = styled.div `
        text-align: center;
`;

export const FormSubmit = styled.button `
     padding: 5px 15px;
     background: #0693e3;
     border-radius: 8px;
     color: #F5F7F8;
`;

export const FormSuccessMessage = styled.p `
    padding: 2px;
    background: #7FFF00;
`;

export const FormErrorMessage = styled.p `
    padding: 2px;
    background: #FF0000;
`;