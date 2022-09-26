import React, { useContext } from "react";
import "../newMOM/newMOM.css";
import { FaGreaterThan } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCaretDown } from "react-icons/ai";
import { momContext } from "../../../MobileApp.js";
function MomZeroState() {
  const {
    date,
    setDate,
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
    dateFormater,addEmail,removeEmail,handlePointsField,handleSubmitData
  } = useContext(momContext);
  return (
    <>
       <div className="d-flex-col justify-around padding-3 height-90">
        <div className="d-flex justify-around width-40 align-center">
          <div className="font-size-14 color-text-888888 small-font-9">Praveer's villa</div>
          <div className="d-flex align-center color-text-888888 small-font-9">
            <FaGreaterThan />
          </div>
          <div className="color-text">New MOM</div>
        </div>
        <div className="font-size-16 font-weight-500 divider-margin">
          Create a MOMs
        </div>
        <hr />
        <div className="d-flex-col justify-around height-14">
          <div className="d-flex justify-between align-center">
            <label className="label-text">Date:</label>
              <div className="d-flex align-center position-relative width-60">
             <DatePicker
                  className="border-df bg-color-fa padding-5 border-radius-4 width-100"
                  value={date}
                  onChange={(selectdate) => setDate(dateFormater(selectdate))}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  />
                <AiFillCaretDown className="position-absolute right-2 color-text-888888" />
                </div>
          </div>
          {dateerror && (
              <small style={{ color: "red" }}>date is required</small>
            )}
          <div className="d-flex justify-between align-center position-relative">
            <label className="label-text">Category:</label>
            <select
              className="border-df bg-color-fa padding-5 width-60 border-radius-4"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option name="select">Select your category</option>
              <option>Layout</option>
              <option>Measurements</option>
            </select>
            <AiFillCaretDown className="position-absolute right-2 color-text-888888" />
          </div>
        {categoryerror && (
          <small className="text-align margin-left-3"  style={{ color: "red" }}>date is required</small>
          )}
          </div>
        <div className="d-flex-col justify-between divider-margin">
          <label className="label-text">Location:</label>
          <input
            type="text"
            placeholder="where did you do the meet?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-df bg-color-fa padding-5 border-radius-4"
          />
        </div>
        <div className="d-flex-col divider-margin">
          <label className="label-text">Share with </label>
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
        className="email-input bg-color-fa width-100"
				onKeyUp={event => event.key === "Enter" ? addEmail(event) : null}
				placeholder="enter share email"
        />
		</div>
		</div>
        <div className="d-flex-col divider-margin">
          <label className="label-text" htmlFor="title">Title</label>
          <input
            type="text"
            className="border-df bg-color-fa padding-5 border-radius-4"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of the MOM"
          />
        </div>
        <div className="d-flex-col justify-around divider-margin">
          <label className="label-text" htmlFor="points">Points</label>
          <textarea
            rows="8"
            cols="50"
            onChange={(e) => handlePointsField(e)}
            className="padding-5 border-df border-radius-4"
            placeholder="write something here"
          ></textarea>
        </div>
        {pointserror && (
          <small className="error-msg" style={{ color: "red" }}>
            Write something here
          </small>
        )}
        <button
          type="submit"
          className="submit-btn bg-color border-none padding-5 border-radius-4"
          onClick={() => handleSubmitData()}
        >
          Submit
        </button>
      </div>
    </>
  );
}
export default MomZeroState;