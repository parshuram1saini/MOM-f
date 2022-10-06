import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineShare } from "react-icons/hi";
import { FiChevronRight,FiEdit2 } from "react-icons/fi";
import { data } from "../../utils";
import "./MomSection.css";
import { MomContext } from "../../../App.jsx";
import { Dropdown } from "react-bootstrap";

function MomSection() {
  const {
    momDraftsdata,
    setMomDraftsdata,
    momSentdata,
    setMomSentdata,
    gotoInnerMom,
    draftsflag,
    setDraftsflag,
    setSentflag,
    setEmaillist,
    emaillist,
  } = useContext(MomContext);
  const [momDraftsClonedata, setMomDraftsClonedata] = useState([]);
  const [momSentClonedata, setMomSentClonedata] = useState([]);
  const [checkboxSelected,setCheckboxSelected]=useState([])
  const [opendeleteModal,setOpendeleteModal]=useState(false)
  const [singleDeleteMomID,setSingleDeleteMomID]=useState([]);
  const { access_token, BaseUrl, projectid } = data;
  const navigate = useNavigate();
  
  ///----open delete MOM modal -----///
  const handleMomModal=(value,id)=>{
      if(value){
      setSingleDeleteMomID((prev)=>[...prev,id])
      setOpendeleteModal(value)
    }
    else{
      setOpendeleteModal(value)
      setSingleDeleteMomID([])
    }
  }
  ///----draftsdocs -----///
  const handleSharedDocs = () => {
    setDraftsflag(false);
    setSentflag(true);
  };
  ///=----sentdocs----////
  const handleSentDocs = () => {
    setDraftsflag(true);
    setSentflag(false);
  };

  ///---navigate to new mom page -----///
  const navigateNewMOM = () => {
    navigate("/newmom");
  };
   ///---filter data ----///
   
  
  ///----add three dots after limit out ----///
  function add3Dots(pointslist) {
    let dots = "...";
    let limit = 25;
    if (pointslist[0].length > limit) {
      return pointslist[0].substring(2, limit) + dots;
    } else {
      return pointslist[0].substring(2,);
    }
  }
  ///---add three dots for title after limit out----///
  function add3dotsTitle(title) {
    let dots = "...";
    let limit = 28;
    if (title.length > limit) {
      return title.substring(0, limit) + dots;
    } else {
      return title;
    }
  }
  ///-----all checkbox ----///
  const check = document.getElementsByName("datacheck");

  ///--- AllSelect checkbox functionlality---///
  const handleSelectAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      for (let i = 0; i < check.length; i++) {
        check[i].checked = true;
      }
    } else {
      for (let i = 0; i < check.length; i++) {
        check[i].checked = false;
      }
    }
  };
  ///---checkbox functionality and show delete and share icon---///
  const handleCheckDeleteShare = (id,e) => {
    const {checked ,value}=e.target;
    if (checkboxSelected.includes(id)) {
      let checkbox = checkboxSelected.filter((itemid) => itemid != id);
      setCheckboxSelected(checkbox)
    } else {
      setCheckboxSelected((previousitem)=> [...previousitem,id])
    }
  };
  // console.log(checkboxSelected)
  ///----delete the mom selected data----////
  const handleDeleteMOM = async () => {
     await axios.put(`${BaseUrl}/api/mom/deleteMOMs?projectId=${projectid}`, {
      momIds:checkboxSelected
    }).then((res)=>{
      if(res.ok)
      {
        getApiData()
      }
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
   
  ///----delete the single selected MOM data----////
  const handleSingleDeleteMOM = async () => {
    setOpendeleteModal(false)
    console.log(singleDeleteMomID)
     await axios.put(`${BaseUrl}/api/mom/deleteMOMs?projectId=${projectid}`, {
      momIds:singleDeleteMomID
    }).then((res)=>{
      if(res.ok){
        setSingleDeleteMomID([])
      }
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  ///----search by title -----///
//   async function handleSearchByTitle(searchtitle) {
//     if (searchtitle !== "") {
//         await axios.get(
//           `${BaseUrl}/api/mom/getMOM?projectId=${projectid}`,
//           {
//             headers: {
//               Authorization: access_token,
//             },
//             body: {
//               search: searchtitle,
//             },
//           }
//         ).then((res)=>{
//           if (res.ok) {
//             setMOMdata(res.data.momData);
//           }
//         }).catch((err)=>{
//             console.log(err)
//         })
//   }
// }
  // /---search by title without API ----///
  function handleSearch(e) {
    if(!draftsflag){
      const newdata = momDraftsClonedata.filter((element) => {
        return (element.title.toLowerCase().includes(e.toLowerCase()));
      });
      setMomDraftsdata(newdata)
    }
    else{
      const newdata = momSentClonedata.filter((element) => {
        return (element.title.toLowerCase().includes(e.toLowerCase()));
      });
      setMomSentdata(newdata)
      
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
  ///----api fetch data-----
  let emailconvertArr = [];
  useEffect(() => {
    getApiData()
      .then((res) => {
        setMomSentdata(res.data.momData.filter(({isDraft})=> isDraft ===false))
        setMomSentClonedata(res.data.momData.filter(({isDraft})=> isDraft ===false))
        setMomDraftsdata(res.data.momData.filter(({isDraft})=>isDraft ===true))
        setMomDraftsClonedata(res.data.momData.filter(({isDraft})=>isDraft ===true))
      })
      .catch((error) => {
        console.error(error); 
      });
    getClientProject()
      .then((res) => {
        emailconvertArr.push(res.data.projects[0].clientId.email);
        setEmaillist(emailconvertArr);
      })
      .catch((error) => {
        console.error(error);
      });
    
  }, []);
  return (
    <>
      <div className="d-flex-col width-95 margin-left-3">
     {/* ///------modal code for delete MOM */}
    { opendeleteModal && <div className="main-modal-wrapper">
    <div className="modal-wrapper">
  <div className="content">
    <p className="notice-text"> Are you sure want to delete ?</p>
  </div>
  <div className="ui divider"></div>
  <div className="actions">
    <div className="ui button yes-btn" onClick={()=>handleSingleDeleteMOM()}>
      Yes
    </div>
    <div className="ui button no-btn" onClick={()=>handleMomModal(false)}>No</div>
  </div>
    </div>
    </div>}
    {/* ///-------//// */}
        <div className="d-flex align-center justify-between width-fit-content divider-margin">
          <div className="small-font-10 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </span>
          <div className="color-text font-weight-500 small-font-10 cursor-pointer">MOM</div>
        </div>
        <div className="momHead-wrapper d-flex justify-between align-center">
          <div className="d-flex width-60 align-center justify-between">
            <div className="mom-head font-w-500">Minutes of Meetings</div>
            <div className="ui fluid category search">
              <div style={{width:"16rem"}} className="ui icon input">
                <input
                  style={{ borderRadius: "4px" }}
                  className="prompt"
                  id="search-bar"
                  type="text"
                  placeholder="Search"
                  onChange={(e) =>
                    //  handleSearchByTitle(e.target.value)
                     handleSearch(e.target.value)
                    }
                />
                <i
                  style={{ fontWeight: "300", fontSize: "14px",opacity:"0.5" }}
                  className="search icon"
                ></i>
              </div>
              <div className="results"></div>
            </div>
          </div>
          <button
            className="mom-button border-radius-4"
            onClick={() => navigateNewMOM()}
          >
            Create a MOM
          </button>
        </div>
        <div className="d-flex width-15 justify-between">
          <div
            className={`font-weight-500 ${
              !draftsflag ? "drafts-tab" : "sents-tab"
            }`}
            onClick={() => handleSharedDocs()}
          >
            Drafts
          </div>
          <div
            className={`font-weight-500 ${
              draftsflag ? "drafts-tab" : "sents-tab"
            }`}
            onClick={() => handleSentDocs()}
          >
            Sent
          </div>
        </div>
        <div style={{ marginTop: "0%" }} className="ui divider"></div>
        {momDraftsdata.length < 1 && momSentdata.length <1 ? (
          <div className="margin-top-7">
          <div className="d-flex-col align-center justify-center font-weight-500 m-auto">
            <div className="add-mom-bg">
              <img
                className="add-mom-img"
                src={"/images/add_mom.svg"}
                alt="add-notes"
              />
            </div>
            <div className="color-text-888888 small-font-12">
              you haven't added any MOMs yet
            </div>
            <div className="color-text small-font-12"
              onClick={() => navigateNewMOM()}
              >
              Add now
            </div>
          </div>
            </div>
        ) : (
          <>
            <div className="content-table">
              {checkboxSelected.length > 0 ? (
                <div className="d-flex align-center justify-between divider-margin">
                  <div className="d-flex justify-around width-14">
                    <input
                      type="checkbox"
                      name="selectall"
                      onClick={(e) => handleSelectAll(e)}
                    />
    
                    <div className="color-text font-size-13 font-weight-500">
                      Select All
                    </div>
                  </div>
                  <div className="d-flex justify-around width-17">
                    <div
                      className="d-flex align-center color-text font-weight-500 font-size-13 cursor-pointer"
                      onClick={() => handleDeleteMOM()}
                    >
                       <AiOutlineDelete className="share-icon" />
                      Delete
                    </div>
                    <div className="d-flex align-center color-text font-weight-500 font-size-13 cursor-pointer">
                    <HiOutlineShare className="share-icon" />
                      Share
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-flex align-center justify-flex-start table-header divider-margin">
                  <div className="width-10" 
                  >
                  </div>
                  <div
                    className="table-heading width-14" 
                  >
                    Date
                  </div>
                  <div
                    className="table-heading width-19" 
                  >
                    Title
                  </div>
                  <div
                    className="table-heading width-14" 
                  >
                    Worktag
                  </div>
                    <div
                      className="table-heading width-17" 
                    >
                      Attendes
                    </div>
                  <div className="table-heading text-align-left width-25">
                    Points
                  </div>
                </div>
              )}
              <div className="table-body">
                { !draftsflag &&
                  momDraftsdata.map(
                    ({date, title, category, points, _id }, index) => {
                      return (
                        <>
                        <div
                          key={_id}
                          style={{background:index ===0 ? "#ECEFF5" :""}}
                          className="d-flex align-center justify-flex-start table-row  height-7 
                          border-radius-4 font-weight-400 color-text-000000 margin-bottom-4"
                        >  
                        <input
                        className="checkbox-field width-5"
                        type="checkbox"
                        name="datacheck"
                        value={`name${index}`}
                        onChange={(e) => handleCheckDeleteShare(_id,e)}
                      />
                          <div
                            className={ draftsflag ? "width-16" : "width-17"}
                            onClick={() =>  gotoInnerMom(index,true)}>
                            {`${date.substring(8, 10)}-${date.substring(5,7)}-${date.substring(0,4)}`}
                          </div>
                          <div className={ draftsflag ? "width-22":"width-24"}
                            onClick={() => gotoInnerMom(index,true)}
                            >
                            { title && add3dotsTitle(title)}
                          </div>
                          <div
                            className="width-16"
                            onClick={() =>gotoInnerMom(index,true)}
                            >
                            {category}
                          </div>
                            <div
                              className="table-data"
                              onClick={() => gotoInnerMom(index,true)}
                              >
                              {emaillist[0]}
                            </div>
                          <div
                            className={ draftsflag ? "width-29" :"width-30"}
                            onClick={() => gotoInnerMom(index,true)}
                            >
                            { points && add3Dots(points)}
                          </div>
                          {!draftsflag && (
                            <Dropdown className={ draftsflag ? "" :"margin-right-13"}>
                              <Dropdown.Toggle
                                as="button" className="threedots-btn bg-color-fa"
                                style={{
                                  border: "none",
                                }}
                                >
                                <img
                                  src={"/images/threedots.svg"}
                                  alt="threedots"
                                  />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item className="d-flex align-center">
                                  <HiOutlineShare className="share-icon" />
                                  Share
                                </Dropdown.Item >
                                <Dropdown.Item className="d-flex align-center">
                                  <FiEdit2 className="share-icon" />
                                  Edit
                                </Dropdown.Item >
                                <Dropdown.Item 
                                className="d-flex align-center" 
                                onClick={()=>handleMomModal(true,_id)}
                                  >
                                  <AiOutlineDelete className="share-icon" />
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          )}
                        </div>
                          </>
                      );
                    }
                  )}
                { draftsflag &&
                  momSentdata.map(
                    ({date, title, category,points, _id }, index) => {
                      return (
                        <>
                        <div
                          key={_id}
                          style={{background:index ===0 ? "#ECEFF5" :""}}
                          className="d-flex align-center justify-flex-start table-row  height-7 
                          border-radius-4 font-weight-400 color-text-000000 margin-bottom-4"
                        >  
                        <input
                        className="checkbox-field width-5"
                        type="checkbox"
                        name="datacheck"
                        value={`name${index}`}
                        onChange={(e) => handleCheckDeleteShare(_id,e)}
                      />
                          <div
                            className={ draftsflag ? "width-16" : "width-17"}
                            onClick={() =>  gotoInnerMom(index)}>
                            {`${date.substring(8, 10)}-${date.substring(5,7)}-${date.substring(0,4)}`}
                          </div>
                          <div className={ draftsflag ? "width-22":"width-24"}
                            onClick={() => gotoInnerMom(index)}
                            >
                            { title && add3dotsTitle(title)}
                          </div>
                          <div
                            className="width-16"
                            onClick={() =>gotoInnerMom(index,false)}
                            >
                            {category}
                          </div>
                            <div
                              className="table-data"
                              onClick={() => gotoInnerMom(index,false)}
                              >
                              {emaillist[0]}
                            </div>
                          <div
                            className={ draftsflag ? "width-29" :"width-30"}
                            onClick={() => gotoInnerMom(index,false)}
                            >
                            { points && add3Dots(points)}
                          </div>
                          {!draftsflag && (
                            <Dropdown className={ draftsflag ? "" :"margin-right-13"}>
                              <Dropdown.Toggle
                                as="button" className="threedots-btn bg-color-fa"
                                style={{
                                  border: "none",
                                }}
                                >
                                <img
                                  src={"/images/threedots.svg"}
                                  alt="threedots"
                                  />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item className="d-flex align-center">
                                  <HiOutlineShare className="share-icon" />
                                  Share
                                </Dropdown.Item >
                                <Dropdown.Item className="d-flex align-center">
                                  <FiEdit2 className="share-icon" />
                                  Edit
                                </Dropdown.Item >
                                <Dropdown.Item 
                                className="d-flex align-center"
                                onClick={()=>handleMomModal(true,_id)}
                                 >
                                  <AiOutlineDelete className="share-icon" />
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          )}
                        </div>
                        </>
                      )
                    }
                  )}
              </div>
            </div>
          </>
        )}
    </div>

    </>
  );
}
export default MomSection;
