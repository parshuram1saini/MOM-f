import React, { useContext} from "react";
import "./NewMom.css";
import { FiChevronRight } from "react-icons/fi";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
// import "react-datepicker/dist/react-datepicker.css";
import { AiFillCaretDown } from "react-icons/ai";
import { MomContext } from "../../../App.jsx";

function NewMom() {
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
    gotoInnerMOm,
    addEmail,removeEmail,handlePointsField,handleSubmitData
  } = useContext(MomContext);
  // const navigate= useNavigate();
  // const navigateHome=()=>{
  //   navigate("/")
  // }
  return (
    <>
      <div className=" justify-around margin-left-3 width-75">
        <div className="d-flex align-center justify-between width-fit-content divider-margin">
          <div className="small-font-10 color-text-888888">Ashok rathi residence</div>
          <span className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </span>
          <div className="color-text small-font-10 font-weight-500">New MOM</div>
        </div>
        <div className="font-size-18 font-w-500 color-text divider-margin">
          Create a MOM
        </div>
        <div className="ui divider"></div>
        <div className="divider-margin">
          <div className="d-flex justify-between align-center">
            <div className="d-flex justify-between align-center width-25">
              <label className="label-text">Date:</label>
              {/* <div className="d-flex justify-between"> */}
                <input type="date"
                  className="border-df bg-color-fa padding-5 border-radius-4  width-75"
                  value={momdate}
                  onChange={(newdate) => setMomdate(newdate)
                  }
                  />
                  {/* <small style={{ color: "red" }}>date is required</small> */}
                  {/* </div> */}
            </div>
            <div className="d-flex justify-between align-center width-30">
              <label className="label-text">Category:</label>
              <div className="d-flex align-center position-relative width-66">
                <select
                 className={`border-df bg-color-fa padding-5 border-radius-4 width-100 ${category===""? "color-text-888888":null}`}
                  // className="border-df bg-color-fa padding-5 border-radius-4 width-100"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select your category</option>
                  <option value="Layout">Layout</option>
                  <option value="Measurements">Measurements</option>
                </select>
                <AiFillCaretDown  style={{background:"white"}} className="position-absolute right-3  color-text-888888" />
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
        <div className="d-flex-col divider-margin">
          <label className="label-text">
            Share with (add more email ID as required):
          </label>
        <div className="email-container d-flex align-center width-100 border-df bg-color-fa border-radius-4">
			  <ul id="tags">
				{emaillist.map((email, index) => (
					<li key={index} className="email-wrapper border-df">
						<span>{email}</span>
						<span className='tag-close-icon'
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
				onKeyUp={event => event.key === "Enter" ? addEmail(event) : null}
				placeholder="enter share email"
			/>
		</div>
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
            rows="10"
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
          className="submit-button bg-color border-none padding-5 border-radius-4 divider-margin"
          onClick={() => handleSubmitData()}
        >
          Submit
        </button>
      </div>
    </>
  );
}
export default NewMom;
