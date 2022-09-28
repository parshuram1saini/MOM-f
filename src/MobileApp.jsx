import React, { useState, createContext } from 'react'
import NewMomMobilePage from './mobileViews/newMOM';
import MomZeroStateMobilePage from './mobileViews/momZeroState';
import MomMainSectionMobilePage from './mobileViews/MomMainSection';
import InnerMomPage from './mobileViews/InnerPageMom';
import "./Styles/mobile/mobile.css"
import { Route, Routes,useNavigate } from 'react-router-dom';
import {data} from "./components/utils";
export const momContext = createContext("context");

function MobileApp() {
  const [selectdate, setSelectdate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [emaillist, setEmaillist] = useState(["Praveervilla@gmail.com"]);
  const [emailvalue, setEmailvalue] = useState("");
  const [pointsdata, setPointsdata] = useState(null);
  const [dateerror, setDateerror] = useState(false);
  const [categoryerror, setCategoryerror] = useState(false);
  const [pointserror, setPointserror] = useState(false);
  const [ pointsdetails,setPoinstdetails]=useState({})
  const {access_token, pointsData } = data;
  const Momdata = data.MomContent;
  const navigate = useNavigate();
  ///---convert date in readable format ---///
  function dateFormater(newdate) {
    console.log("dateformat")
    const todaydate = `${newdate.getDate()}-${newdate.getMonth()+1}-${newdate.getFullYear()}`
    setSelectdate(todaydate)
    console.log(selectdate,typeof selectdate)
  }
   
  ///-----remove the email----///
  const removeEmail = indexToRemove => {
		setEmaillist([...emaillist.filter((_, index) => index !== indexToRemove)]);
	};

  ///----add the email---///
	const addEmail = event => {
		if (event.target.value !== "") {
			setEmaillist([...emaillist, event.target.value]);
			event.target.value = "";
		}
	};
  ///------add the points in field -----///
  const handlePointsField = (e) => {
    setPointsdata(e.target.value.split("\n"));
  };
   ///------navigate to MOM inner page -----///
  const naviagteInnerPage = (index) => {
    navigate("/mominnerpage");
    setPoinstdetails(Momdata[index])
  };
  ////---fix error ---///

  const handlePostData = () => {
    console.log("sdfds")
    const bodyData = JSON.stringify({
      date: selectdate,
      category: category,
      location: location,
      title: title,
      // sharedWith:emaillist,
      points: pointsdata,
    });

    fetch("https://pmt.idesign.market/api/mom/addEditMOM", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: bodyData,
    })
      .then((response) => {
        if (response.ok) {
          setSelectdate("");
          setCategory("");
          setLocation("");
          setTitle("");
          setPointsdata(null);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmitData = () => {
    console.log("vb", category);

    if (selectdate && category && pointsdata) {
      handlePostData();
      setDateerror(false);
      setCategoryerror(false);
      setPointserror(false);
    }
     selectdate ? setDateerror(false):setDateerror(true)
     category ? setCategoryerror(false):setCategoryerror(true)
     pointsdata? setPointserror(false):setPointserror(true)
  };
  return (
    <>
    <momContext.Provider
        value={{
          selectdate,
          setSelectdate,
          category,
          setCategory,
          location,
          setLocation,
          title,
          setTitle,
          emaillist,
          setEmaillist,
          emailvalue,
          setEmailvalue,
          pointsdata,
          setPointsdata,
          dateerror,
          setDateerror,
          categoryerror,
          setCategoryerror,
          pointserror,
          naviagteInnerPage,
          pointsdetails,
          setPointserror,
          dateFormater,addEmail,removeEmail,handlePointsField,handleSubmitData
        }}
      >
       <Routes>
       <Route path='/' element={ <MomMainSectionMobilePage/> } />
       <Route path='/momzerostate' element={  <MomZeroStateMobilePage/> } />
       <Route path='/newmom' element={ <NewMomMobilePage/> } />
       <Route path='/mominnerpage' element={ <InnerMomPage/> } />
       </Routes>
      </momContext.Provider>
    </>
  )
}

export default MobileApp;