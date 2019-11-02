    import React from 'react';
    import { withTranslation } from 'react-i18next';
    import '../css/home.css';
    import Navbar from '../components/Navbar'
    import ImgsViewer from 'react-images-viewer'
    import image1 from '../resources/examples/1.jpg'
    import image2 from '../resources/examples/2.jpg'
    import * as axiosRequest from '../util/axiosRequest'

class HomeReal extends React.Component {

    

   constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
            publicationsSale: [],
            publicationsRent: [],
            type: "",
            operation: "",
            search: ""
        };
      }
    
    componentDidMount(){
        let currentComponent = this
        axiosRequest.getSalePublications().then(function (publications){
            currentComponent.setState({
                publicationsSale: publications
            })
        })
        axiosRequest.getRentPublications().then(function (publications){
            currentComponent.setState({
                publicationsRent: publications
            })
        })
      }


    renderNewest(array, table, t) {
        if(array.length > 0) {
            const maxResults = 8;
            let loopEnd;
            if(maxResults > array.length) {
                loopEnd = array.length;
            } else {
                loopEnd = maxResults;
            }


            for(let i = 0; i < loopEnd; i ++) { 
                table.push(
                    <li class="polaroid">
                        <div id="imageDiv_1" class="arrows-div" currentImage="0">
                            <img alt="NoDisplay" class="polaroid-property-img" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMVFhUXFxsaFhgYGBkZGxgXGBgeFxgZGhUYHiggHxolHRcYITEiJSkrLi4uHR8zODMtNygtLisBCgoKDg0OGxAQGzElICYtLTAtNy0vNS8tLS0tLS0tLS0tLy81LS0tLS0tLS0tLS0tLS0tLS0tLS0tNi0tLS0tLf/AABEIAKEBOQMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAIDBQYHAQj/xABHEAABAwIDBAYFBwoGAgMAAAABAAIRAyEEEjEFBkFRImFxgZGhEzKxwfAHQlKS0eHxFBUWI1Nyg5PS02KCorLD4jNDRGPC/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAEFBv/EAC8RAAIBAgUEAQIFBQEAAAAAAAABAgMRBBIhMUETFFFhMiLwQnGRodEFFYGxwSP/2gAMAwEAAhEDEQA/AO4oiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIo2MxzKQl7o5DUnsaLlcbSV2dSb0RJRa0N6G1M5oAkNjpOBAM9ax+A3rq1czAzpt4sywRMfPLePJUPE01oXLDVPBuqLStpbx1KbCQX2gS5lpPN4EeCxe0d8XPgU6tVvSEnKzTjH2KLxcETjhKktjpKLnNHeis2RTfUqgAS4sAgmbEEHlw61Pxe81ZlLM2th3vAkgaHnF57kWLph4Sojd0XMjv5iOLWRN49l5hZDDb91GhprUDkdHTE+ItB7LIsXTYlg6q4N9Rakd96LjDHMFplxcB2XAupmA3vw7w7M8NLdb2P7pOo61Yq9Nu1yt0Ki3RsKKxhsWx46J7uPgr6tTT2KWrBERdAREQBERAEREAREQBERAEREAREQBERAEREAREQBEUfF4xlNpc9waBz+zUlcbS1Z1JvYvudFysFtneVlEtA6RPsWM2/tmo6mx9MhtMuFtS6JNyLAdHQeK1x2HfWqOeYAc67iei23XoIErz8RjGnlhubqGET+qpsZTEbzYisXCkMrQJLmjpAc4nXldeYGnlc17nkZwSTUdL3gAkZgbBvV2KJQwRNR1Og45SLkmJA1JjhJsrOIwJ9Jkac5sARoTxAnlGv2LE6s39T1NqpU/jHT75LFfaVXM6HmJIbAA6M2gACLRoqnbWeCwtiG08pDhOZxOZzydZngqMRg3MMPEGJAtoq8LgHVHZWxN9dIVCnO9uS9xp2vwQ69Ks6n6R5e6nMS50iSYsCedrW4KzhNnVKhy02yeOgA7SVlMXRqN/VPJhpkN4X49asuY5gnpAOHWJHbxRvXW/skpaaW9EGlUqUnODHkEEtcWm0ixvxuqcLgKlVxaxsnU3A7SSe1SPQ9Su4dzmElhLSREjkuKavrsSd7abmLfQIJBEEEgjkQYI8QspjqFduFYHPJouymORmQJ5SOB1tCj+h+PbfmspsjB0qnRr1S1ou1sgAnnJsCpwd3ZEajsrvj0a4ynBBgWIPbdTNqYx1UD9XSbeZDSD4zope1KOFa5wo1w+IGXWZj1XAQYn2q3XxdVzDTL8zY6Ie3Nl/ddqBbrUruLszl1OzS/4XNm4F+Qv9O5rY1YcxbF+k2Q7l6t1P2fvViKdVtN2IbUZYBxba+kuIB7SZWP2lSoRSFKZP/kNzbiTNpmbBSRu4G1Mr3TSiWvbAkRYdSuhOS+JnnGEtZ/6N1w29dL0ooVQadQ8ZBYSdAHTN+sBZrD4tj5yODo1grlGGe5ueiym97HmaT4LSDFqjH2mAOqYV7E7ar4as0F7XwJJZDTUabDNycI5d62QxT/EYp4RX+lnWEWt7v71067m03Ase4S3MID41jgT2LZFtjNSV0YpQcXZhERSIhERAEREAREQBERAEREAREQBERAEREBaxOIaxpe4w1okrQ9obQDwXZDmqZgC4CzJ0b5Seanb3bSzu9E09Fh6XW7l2D29iw1V2cgxAa1rWjqAue8yfBePjMTmlkjwephaGVZpclJqOLAwnot0FrKSK/6kUg352YnnGnx1K5ULSxjWiC0HMeZJVsMWLVPfg1aPjkqwY9Gc7mEgg5SdJ7fFWvRFzrSSTNtZ1Uw1HFrWk9FtwI6jF+9SaLjRddozub0Raw4k+Smop2XBBzau+TCjDj1oueOpPfqqqdItuJB4ESIU/wBErlJuUgwDBmDoVFQ1JOpoQK1JxOZ0kxAJm4HAT2+an42jmwzTPqRNuvLHUbqrE1S92Z0cgBwH3+5WH0wbePX3KxWjfm5C7dntYgUdnufIaNFZrYRzTDhB61k3N+NPNRKtEAlxJJiJLiT2XVTirey2M3chPoqlgAU4U+akYrA0vRuqMqaCSHET2dR9q5Gm5bEnVS3IOOxDHso0mth0jO4izRo4zxk37la25h6VKsKdM5uhJvMGeJ6xdeFsxxUZ7ADYAc/xU891ZoKNno/JQBeD+Hcs5UfTo0jUZUkhsDpDpEnQ0yY1i2oWBe6FXUpgiTHekJZTtSOYkVcbWbTl7AWPks+bE3ga25eSwNR2Y5nEzxJJPtU7aW0qlX0bMrcrABabwIBPdw+BapYJ75DBJa0uPYImOZurW+CMY2V3oWW46o1mQGQDLZ1Y6ZzNcLg+S3ncbezOfQYh/TJ/Vudxn5hJ4zp4cp589G0HmHNa6JgEAnpRmjti6upVHB3RXWoxnHU76i1zczb4xNItMipTgOnjPEd4I8Fsa9aElJXR4s4uLswiIpEQiIgCIiAIiIAiIgCIiAIiIArOMrZGOf8ARaT4BXlE2qzNSeBxEeajNtRbR2O6uaC5hJJNyTc9araxS3UFU2kvncjue3nVi2KJFjawPcVUKYkS4NHEngpNR+ZxJEaAdg+8lesarMivoV5nyQmV2F7m0jmDS3pcHHiLcoV2nnc81HkZiMoAmGt1i/E28FfbTHAQvQxdUWHJFsC/Wqy1VtavcvGDCkokcxHDL81X6OFfaIVtgPELuQ5mLRbzXjazWsILJvrAPlzV56jGnzTK0zuZMikf4co4CbxrfrmVFr0WusRPgsg7Tgozm/Bt7O1VuBYplGFw4Ja2YBtKubSNAMNN0NqNbObKel1yNZ5fYrD3gqJi5LiSZMBt+Q/FTirJ6HG7vcgOuARMKuu6BHwVU5sdSsucDxVagXZ0VUGCQeatsxTqdQPYbiRB0INoIQ1gB2qFWqKUYO4z3I+XgslhMaW0XU7g52vY4fNe2OPZ7+agNcFOw9IFWpMhKSaMvuVjHNxzXOI/WgtdwBkSDy9Zo8V1Zcm2Vsw1ajWs9aRflFyV1gL0MLfLZnmYppyuj1ERajMEREAREQBERAEREAREQBERAFRVZII5qtQtobWoUI9NWp050zuDSewFcduTq9HPdqb0UqWINBxzZTlc5t4cDBnh3BTmbYouEh7Y5yBZc6pUGue8tIq0/SPuZBLgDldoHfOmJ7VRUwlMwMzgQLTJ4nhFuPmvGnoz6CcMKrRza8m+1N58MNagjmL+xXMNvHh36VB3yNNRfiudHZk2Y9p5iePUsnS2Q8gl9QWYGtlrRly+qMxaYbcyBBdxKg5xW7Jujhct1P7/AEN+p7TpuEh7T3q9Tqzo0rSN1Wsw5eakOzQQQNCOJn2rYqu8LQJiR2g+xYq2Kqxnlpxv7MlRU4u0XdGaJPJXMPisou0xGlpWofpwxrjmpy3gRe/7p4dvFUbK3ypVqmQtcwk2BiD3jj1KM8RjYLMoff6laUZGyU9pANIIIMmJHCbX7F4/atNpguAPX96sufm0WK2lQBPT05Kmh/VpyeWUUWqjFmUdtyiT6418tfaVEr7epSL2PGQtb2tUpU6UNDZ+aODRzgLTsQXnUkmePvXrUKkqyvsXQwitd3Oj1d56IaTnF7Aa8vsUOtvTRkwdfL4utCIGUCBIJJI4zFj2R5lWn01oUPZZ2sbXN+wm8+HdVa18hhm+gBjozBmJ9qg4zeOmyo5olwB1EHhzHK4WnYag57srNSrtWh6NxvJGkae1dyK5krSpQ0W5u7t7cEKUlj3Pi8uygHqg/atcqbc7p0+OOqxlPLOcsbm5xp2dar/KXcye2/kV3KvBl6xu27uzHV2h7yQ3hGvis4d3sO3puNh9J/R7wfYudMxj41PjGmkQpGJ23VqRmcXEc+Xb8SvLrYSvUndTsvRPuV4N3xuy8PkLyGgAaxHZELCVX0WU8zKokEDLBzX5jl1rVvzhU0zmJmOHhoO5Q8RVcQb35qeHwNSnvUb1IyxLatY7xuJsp7A6tUETLWD/AAg3d2Ei3V2rblx/Zfyk1cNSwtN2HFRhoMc98uBEkg6NIEEGJ16l0TdzevC421CoC8NDnMJGYNMXsSCLi4JXv07JWRindu7M4iIrCAREQBERAEREAREQBERAEREAXG999nirj6uZ2a4ET6rcrRl6rzEcyV2Rc03w2RVbjhWGYsfBhlKZIGWHvAMRY8JlUYhNx0NGHaUjSNm02MzsDmk6gSJPAwNfjkva2Gu1w1BIPYTa3esFt/Bua9wBIOYwRaCYuALzMyR1LWBtjEiG+kdINiRmk/5hfTTtWRUHPVMnWjaWbydD9DxHBSRUkanxKze6+yw/CUjXBNVzZfIAMnhAAiBZZJu61Lg5wHK3tXjSxUMzi+GXqhJJM1EuJ9/xyRwOl9LLcxsOmLCV5U3bYfnx3BQWLi3sWdv7Od4vCEzzVgbLqkdCm5x4ZQQZ7eGi6dhNhUad/WPN32KzjdvYaj0TUbI+a27vqi/krO/n8YRv9+ifQh5PN1/TGiPyinleLTIuOZHAqrauCNRhaBcjXksFW39pTFOnVd1wG9ejiD5KPid/CR0KR/zGPISsLwOIlUzqFufBbFxTvcoxu61d7W5CC7iDYEcL9Sxb90cZ+y/1M+1S6fykNYYq0iHcmkGfGFZxnypEt6GHdHN7gPIST5L0affxWXIv2/ku7xR0uiE7dTF/sx9ZqrZubjHfNpt/ecfcCouC39xZBLjSgugAt4ngIcDp1KTjt5cW9xYKobBglggDXWZtbmtGXH3s8q/UqeLi1oZzZm6tSmyC6jmgy4ZiSYtZ1tfwUJ+5lcyZbPW7XvAK1XE7Vrg5jVqzzFRwymYktmOqD12V/B7344f+yW8Ja0nviCfjtXXh8atVOL/xYx/+LlqmZevu69nrgt69R/pBVvCbNzWFNxPWCfKLKfsT5RGthmMYQ76bQS09wMjzC2tu+2Ci1enpNiCYkC4F+IVEq2Kh9M4a+tUSVGk9UzUm7AcfmOnvCfovWL2xTMcSt32ZtmhiJNKo10GDfQ9YWVY9ZHj60XZq35lnbU7Gh4jciqRLSwHlp7lD2vug3DYV9aq+XsGYxcASBFwuk1HwJC0v5Vtohmz3t41XsYOeuc/6WFWYfFVZ1I0292iMqMIxcrHJqGLrVqvSc4NFgJNmyCGwOEgW5rffkswzjtKiWOM9NzocRLQzpzpN3ttxN+C59sSg4kkTqOOv3dS738iuAa2hWrdEuc/JbUBrQ89LrL+ywX0y+VjC9IXOkhERXGYIiIAiIgCIiAIiIAiIgCIiALxeqioLHsQHO9993RiS/EMkvAswCS5ogdEfSgd/guWV9jw85WGk4XgtLSHGxtxHHnc9/bMLi5AUTbWz2YgAPJtoQeK8zrJ6noxi1ozDbg1C/BszElzS4EnU9IkeRWyOssfszZ4wrHBpc9pMwYkGItETotZ29tLF1TFNhYzj9Jw7RoOoeK8SrhZSqyy6Xd/Rqi7mR3g3uoYaR0qjxq1l47ToPM9S0THfKpXzFrMO1gnVzsxjnAjh1rHnZLmEjMde0Sbm2ii19huqETJjT3r0aGAwsfn9X5/wVTdX8OhIxm9uKxbnMbV9HTDQXNEBxBIBGeOubRYG5SiwtBLGWM8JGvCRzIv1jvsM2OaUZWuBDpcXEnMNIsLcDCyWCxLYjj8R3hbEoQVqSSXohGLfz3LVLCvqGY/xSSOI+lOpnTWetWcdTcC4kRBgxpJBIE9cG3UVXUx1IBwE6w4BxMR1G3l9qtNxbXsLcwJMXPUIkeAUrPcnmVrGqbQe/OSYAN4mdZ4q1Ta55Dc3GRPDrWdGCYSQ4OcPfznQKmjkY4ZabpHMye2StGfTQyOnrqXsNswAwQY4m5DROveYF+KmVMC9rgGTq0C09Wg6+PFUDH1S0tDGwY1F7dYVf5RiI1HLQ6eKpbZelFbEXFMPRcCeGfM1pIdNy0cWRlPSHBRGuLGwSJ004Hi0n3xw7p5qP+fw4ix85srmMxDXxLRNgI7Ofep5tLEMut0zXMS+ZzESD0ReYvMECPx7YjB8nLl7evnZZirs6kZs6ZsQT3i9onqUijhaTJLaZJP0rxpx8VZnSKunJvUtbOrFhaacsuL307QePX5LZ8FvPiabgWuc9oN2uuCDwB1+OKxNAmfUkcoAjwCvQ8iAA0cwL+Ky1adOp8kmaablFaHW9jbTZiGZmmCLOadWnkfceK0X5XaZe6jSaQA0Fxk26RDZ05Nd4rEbNqVaLxUpvLXaTa45EcR2qTjKzq1Q1apBcY0EAAaADkvPoYNUK2eL04LZSc42Zit3dnF36sEhgu5xGvU0nX8V9I7u7No0KDGUG5WEZhJJJL+kSSbk39g4LheHrBgJXftn0i2lTadWsaD2hoC9ehLNJsw4iOVJEhERaTKEREAREQBERAEREAREQBEXhKA9VLiBcqHW2k0erc+Sx9bEOdr4cFnqYiMdtWXQoylvoa7tQ+iquA9UklvYb+WistxizePwrajYd3EahaviqLqZjXkQvHqRd20erTcWrPcyzcbNlbq1WngOSwv5R8aqr8p+PFVOUuS3pIx+J2Zmq6wFntm4NlMWA+OtY70t7G/x9iuHF/h8di5nZOULmZeKZ1a0rB7Z2DSq3aA08ot4Ko4u4B+PiypftBS6kiCo2NZxG6pmQ1pPOO5WKe7ziYyrbRjb/HDTyVpuLBuCrFiJneivBgqu65AsZVOD3Zk9OwWwOxsg9uvZ+Kpfi72/DtTrTCpLwe4bYVBsdAG/jCqrbIon5oGunGytjF9dvt/EKwMYY8j2/EKOeZ3pFOK2LSgwPxWJxewmgEtusm7G6C+vx7lYdiCZ4fepxnNHOmjX3YICbL30A4BZKteVGcAe8X4d60Ko2QdNIssp/eq7L0lW8/ku3ucyo9eY9ys1q3JWq1f47/wVGFomq/KCAOLjoBz+5TjEhKSRs3yd7Hdi8Y0kH0VEipUPAkHoM7SR4By7wtB3Sx1LDUW0aLBGrnH1nuOrnHn5AWWzYfbUnpAR1LTTqU4qx59aM5u5mEVulWa4S0gq4tSdzKEREAREQBERAEREAXhXqpqMBEG4QEDFbVa2zekfId6xVfGOebnu4eCyWN2OKnzsvKBHsKgHdl/zcS4drc3tcslWnVlyaac6cSPmXrSpLd36o/8AkNPbSHucFdZsWpxqs/luH/IqO3qeC3rQ8kQqNicG14ghZcbFdxqD6p/qQ7GdwqNj90/1LnQqeB1oeTVK+7gN21Ht8D/uBUd+7lTg9pHLLHiQT7Fun5of+0b9Q/1K2/Y1XhWpjtpOP/InbTe6JrFJbM0StsWuNGNPU18/7g1Q34GsNaNTug/7SV0X8y1v29P+S7+6vfzNW/bU/wCS7+6udo/BNY63Jy6tmb61OoO2m/25VFq4po9Z0dtvbC62di1v21P+S7+6vRsWrxq0z/Cd/dTs34JL+oHGxtSlMelpyToXjU6C/sRu0aU3qM5eu2Z8fJdjOwCfWdTP8I++oVaO6rD6won+F9rinaPwd/uCOSjFNmczb8iPJU1cezi9ve4X+9dX/Q+mNGYcfwP+6qG6beIofyP+6dmx/cEcjqbSpjWoz6wUd22KVv1rfH4ldl/RePVNEfwj7nr1u7bvp0v5Tv7i72j8HHj0cVftemI6RMfRa4+ACN2o0zFOt2ilU8rLtX6PVOFSj/Kf/dXrdgVeL6J/hvH/ACKXbev3IvG+0cVbiyf/AE1uz0b/AHhMtZ3q4eqe6PaV238wu50/qu+1Vs2Fzyd0rvbtfh/ci8Xfk4e3ZONdpQy/vOHsEq6zc7G1PWNNni77F212xzwyef2K2dkVedOP83tUunNbRIPEJ8nJcP8AJw8/+SsT1AAeeqz+zdyadPme1b07ZFbgaXfm+xUDZOI50fF49y441fBHqQ8mJw+zGsEBSm0wFMGycR/9X13f0L0bIrcfR/Wd/Qq3RqeCXVh5IjKsGQSDzU2hthzfWGYeBXjtjVeBYe8j/wDJUWpsfFfNFDvqPPsphSjCrHYjKVOW5ncNtOm/jB5G3nopsrUG7Exvzjh+4v8Ae1Z/ZOEfTEPjuc4j6psFrpyqP5Iz1IwXxZkERFcVBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQH//2Q=="/>	                        
                        </div>                    
                        <div class="line_separator"></div>
                        <div class="description_box">
                            <label class="price">U$S {array[i].price}</label>
                            <label  class="expenses">{array[i].title}</label>
                            <label>{array[i].address}</label>
                            <a class="more-info" href="%"> {t('home.moreInfo')} </a>
                        </div>
                    </li>
                )
            }
        }   
    }

    setOperation(){
        alert("asd")
    }
    

    render(){
        const { t } = this.props;
        
        const state = {
            isOpen : false,         
        } 
        
        let tableSale = [];
        let tableRent = [];
        this.renderNewest(this.state.publicationsSale, tableSale, t);
        this.renderNewest(this.state.publicationsRent, tableRent, t);


        
        return(
            <div>
                <Navbar t={t} />
                <header>
                <div className="header">
                    <div className="title">
                        <h1>{t('home.title')}</h1>
                    </div>
                    <form>
                    <div className="search_list">
                        <fieldset className="search_list-container rounded">
                                <div className="search_list-item selected" id="buy">
                                    <input value="FSale" type="radio" checked onChange={this.setOperation}/><label id="buy-label" >{t('home.buy')}</label>
                                </div>
                                <div className="search_list-item" id="rent">
                                    <input value="FRent" type="radio" onChange={this.setOperation}/><label id="rent-label">{t('home.rent')}</label>
                                </div>
                        </fieldset>
                    </div>
                    <div id="icons">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-8">
                                    <form id="card" className="card card-sm">
                                        <div className="card-body row no-gutters">
                                            <div className="col-auto">
                                                <i className="fas fa-search h4 text-body"></i>
                                            </div>
                                            <div className="col">
                                                <select className="type-home-select">
                                                    <option value="House">{t('home.house')}</option>
                                                    <option value="Apartment">{t('home.apartment')}</option>
                                                </select>
                                                <input type="hidden" id="propertyType"/>
                                                <input className="form-control form-control-lg" type="search" id="input_search" placeholder={t('home.search')}/>
                                            </div>
                                            <div className="col-auto">
                                                <input id="searchbutton" className="btn btn-lg rounded" type="submit" value={t('home.searhBtn')}/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </header>
            <div>
            <section class="newest_homes">
                    <div>
                        <h3>{t('home.newPropsOnSale')}</h3>
                    </div>
                    <div>
                        <ul id="newest-homes-fsale" class="newest-homes-list">
                            {tableSale}
                        </ul>
                    </div>
            </section>
            <section class="newest_homes">
                    <div>
                        <h3>{t('home.newPropsOnRent')}</h3>
                    </div>
                    <div>
                        <ul id="newest-homes-fsale" class="newest-homes-list">
                            {tableRent}
                        </ul>
                    </div>
            </section>
            <ImgsViewer
                imgs={[{ src: image1 }, { src: image2 }]}
                isOpen={this.state.isOpen}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                onClose={this.closeImgsViewer}
            />
            </div>
        </div>
        );
    }
}


export default withTranslation()(HomeReal);