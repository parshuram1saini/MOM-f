import React,{useContext,useEffect,useState} from "react";
import axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineShare } from "react-icons/hi";
import {FiChevronRight} from "react-icons/fi";
import { Link,useNavigate,useParams} from "react-router-dom";
import "./InnerPageMom.css";
import {data} from "../../utils/index"
import { MomContext } from "../../../App.jsx";

function InnerPageMom() {
  const navigate= useNavigate();
  const {id}=useParams();
  const [clientName, setClientName] = useState("");
  const {BaseUrl,projectid,access_token}=data
  const {pointsdetails,setPointsdetails,draftsflag}=useContext(MomContext)
    console.log(pointsdetails)
   ///-----highlight the match point text---///
   const highlightPoints =()=>{
   let textToSearch = document.getElementById("search-bar").value ;
   let allpointslist = document.getElementsByClassName("points-area");
   let special = /[\\[{().+*?|^$]/g;
    if(textToSearch!=="")
    {
      if(special.test(textToSearch)){
        textToSearch = textToSearch.replace(special,"\\$&")
      }
      let regexp = new RegExp(textToSearch,"gi");
      for (let i=0;i<allpointslist.length;i++){
        allpointslist[i].innerHTML = (allpointslist[i].textContent).replace(regexp,"<mark>$&</mark>")
      }
    }
    else{
      for (let i=0;i<allpointslist.length;i++){
        allpointslist[i].innerHTML = allpointslist[i].textContent
      }

    }
}
 ///---get api data ----///
 async function getApiData() {
  return await axios.get(`${BaseUrl}/api/mom/getMOM?projectId=${projectid}`, {
    headers: {
      Authorization: access_token,
    },
  });
}

///---get client project ---////
async function getClientProject() {
  return await axios.get(
    `https://pmt.idesign.market/api/projects/getProjects?projectId=${projectid}`,
    {
      headers: {
        Authorization: access_token,
      },
    }
  );
}
useEffect(()=>{
  getClientProject()
  .then((res) => {
    setClientName(res.data.projects[0].name);
  })
  .catch((error) => {
    console.error(error);
  });
  getApiData()
  .then((res) => {
    setPointsdetails(res?.data?.momData?.filter(({_id})=> _id===id)[0])
  })
  .catch((error) => {
    console.error(error); 
  });
},[])
///----bullet points -----////
const bullet = "\u2022";
  ///---navigate to home page ----///
  const navigateHome=()=>{
    navigate("/")
  }
  return (
    <>
      <div className="d-flex-col width-75 margin-left-3">
        <div className="d-flex font-weight-500 small-font-10 width-fit-content justify-between align-center divider-margin">
          <div id="ids" className="small-font-10 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center small-font-12 color-text-888888">
            <FiChevronRight />
          </span>
          <div className="small-font-9 font-weight-500 color-text-888888 cursor-pointer" onClick={()=> navigateHome()}>MOM</div>
          <span className="d-flex align-center small-font-12 color-text-888888">
            <FiChevronRight />
          </span>
          <div className="color-text">{pointsdetails?.title}</div>
        </div>
        <div className="momHead-wrapper d-flex justify-between align-center">
          <div className="d-flex width-60 align-center justify-between">
            <div className="mom-head font-w-500">Minutes of Meetings</div>
            <div className="ui fluid category search">
              <div className="ui icon input">
                <input
                  style={{ borderRadius: "4px" }}
                  className="prompt"
                  id="search-bar"
                  type="text"
                  placeholder="Search Text"
                  onChange={(e)=>highlightPoints(e)}
                />
                <i style={{ fontWeight: "300", fontSize: "14px",opacity:"0.5" }} className="search icon"></i>
              </div>
              <div className="results"></div>
            </div>
          </div>
          <Link to="/newmom">
            <button className="mom-btn">Create a MOM</button>
          </Link>
        </div>
        <div className="d-flex-col">
          <div className="d-flex align-center">
            <div className="points-field font-size-18 font-weight-400">
              {pointsdetails?.title}
            </div>
          </div>
          <div className="d-flex justify-between width-91">
            <div style={{margin:"5px 0"}}className="color-text-888888">
            { pointsdetails?.date && (`${pointsdetails?.date?.substring(8, 10)}-${pointsdetails?.date?.substring(5,7)}-${pointsdetails?.date?.substring(0,4)}`)} . 
              {pointsdetails?.location}
              </div>
            <div className="d-flex justify-between width-fit-content">
              <div className="color-text-888888">
                {pointsdetails?.category}
                </div>
              <div style={{marginLeft:"35px"}}>Share With</div>
            </div>
          </div>
          <div style={{ width: "80%",marginTop:"0" }} className="ui divider"></div>
          <div className="d-flex justify-between width-95">
            <div
              name="points"
              className="points-container-field border-none width-84">
              {
                pointsdetails && pointsdetails?.points?.map((elem, index)=>{
                  return (
                    <div  key={index} className="d-flex divider-margin-5">
                      {elem !==bullet && <span className="points-counter"> { bullet} </span>}
                      <div  name="points-text"  className="points-area text-align-justify">
                       {elem ?.substring(1,)}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="share-with-wrapper">
              <div style={{ width: "75px" }} className="ui divider"></div>
              <div className="d-flex-col align-left justify-between">
                { draftsflag && (
                  <>
                <div>{clientName}</div>
                  </>
                )}
                <div className="color-text d-flex align-center width-fit-content">
                  <AiFillPlusCircle /> Add Members
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InnerPageMom;
