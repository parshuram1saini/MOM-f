import React, { useContext } from "react";
import "./momZeroState.css";
// import { useForm } from "react-hook-form";
import { FaGreaterThan } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCaretDown } from "react-icons/ai";
import { MomContext } from "../../../App.jsx";

function MomZeroState() {
  const {
    momdate,
    setMomdate,
    category,
    setCategory,
    location,
    setLocation,
    title,
    setTitle,
    emaillist,
    dateerror,
    categoryerror,
    pointserror,
    dateFormater,
    addEmail,
    removeEmail,
    handlePointsField,
    handleSubmitData,
  } = useContext(MomContext);
  console.log(momdate);
  return (
    <>
      <div className=" justify-around margin-left-3 width-75">
        <div className="d-flex align-center divider-margin">
          <div className="small-font-9 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center color-text-888888 small-font-9">
            <FaGreaterThan />
          </span>
          <span className="color-text">New MOM</span>
        </div>
        <div className="font-size-18 font-w-500 divider-margin">
          Create a MOM
        </div>
        <hr />
        <div className="divider-margin">
          <div className="d-flex justify-between align-center">
            <div className="d-flex justify-between align-center width-25">
              <label className="label-text">Date:</label>
              <div className="d-flex align-center position-relative">
                <DatePicker
                  className="border-df bg-color-fa padding-5 border-radius-4"
                  // value={momdate} onChange={(selectdate)=>
                  // dateFormater(selectdate)
                  // setMomdate(selectdate)
                  // }
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                />
                <AiFillCaretDown className="position-absolute right-10 color-text-888888" />
              </div>
              {/* <input type="date" placeholder="enter the date" onChange={(selectdate)=>
                  // dateFormater(selectdate)
                  setMomdate(selectdate.target.value)
                } /> */}
              <div class="ui calendar" id="example2">
                <div class="ui input left icon">
                  <i class="calendar icon"></i>
                  <input
                    type="text"
                    placeholder="Date"
                    onChange={(selectdate) =>
                      // dateFormater(selectdate)
                      setMomdate(selectdate.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-between align-center width-30">
              <label className="label-text">Category:</label>
              <div className="d-flex align-center position-relative width-66">
                <select
                  className="border-df bg-color-fa padding-5 border-radius-4 width-100"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Select your category</option>
                  <option>Layout</option>
                  <option>Measurements</option>
                </select>
                <AiFillCaretDown className="position-absolute right-2 color-text-888888" />
              </div>
            </div>
            <div className="d-flex justify-between align-center width-27">
              <label className="label-text">Location:</label>
              <input
                type="text"
                placeholder="where did you the meet?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-df bg-color-fa padding-5 border-radius-4"
              />
            </div>
          </div>
          <div className="d-flex justify-between align-center margin-left-10 width-50">
            {dateerror && (
              <small style={{ color: "red" }}>date is required</small>
            )}
            {categoryerror && (
              <small style={{ color: "red" }}>category is required</small>
            )}
          </div>
        </div>
        <div className="d-flex-col">
          <label className="label-text">
            Share with (add more email ID as required):
          </label>
          <div className="email-container d-flex align-center width-100 border-df bg-color-fa border-radius-4">
            <ul id="tags">
              {emaillist.map((email, index) => (
                <li key={index} className="email-wrapper border-df">
                  <span>{email}</span>
                  <span
                    className="tag-close-icon"
                    onClick={() => removeEmail(index)}
                  >
                    x
                  </span>
                </li>
              ))}
            </ul>
            <input
              type="email"
              className="email-input bg-color-fa"
              onKeyUp={(event) =>
                event.key === "Enter" ? addEmail(event) : null
              }
              placeholder="enter share email"
            />
          </div>
          <div className="d-flex-col divider-margin">
            <label className="label-text" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              className="border-df bg-color-fa padding-6 border-radius-5 border-radius-4"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write your title here"
            />
          </div>
          <div className="d-flex-col divider-margin">
            <label className="label-text" htmlFor="points">
              Points
            </label>
            <textarea
              rows="8"
              cols="50"
              className="points-container border-df bg-color-fa padding-6 border-radius-4"
              onChange={(e) => handlePointsField(e)}
              placeholder="Type something here"
            ></textarea>
          </div>
          {pointserror && (
            <small style={{ color: "red" }}>write something here</small>
          )}
          <button
            className="submit-btn bg-color border-none padding-5 border-radius-4 divider-margin"
            onClick={() => handleSubmitData()}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
export default MomZeroState;
