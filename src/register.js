import React, {useState, useRef} from 'react';
import {courses, subjects} from "./constant";

function RegistrationForm() {
    const [course, setCourse] = useState("c1");
    const [startDate, setStartDate] = useState("");
    const [notes, setNotes] = useState("");
    const [subject, setSubject] = useState(subjects[course][0].id);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);

    const registerForm = useRef(null);
    const isErrorNotes = notes && (notes.length < 20 || notes.length > 500);
    const isErrorDate = (!startDate || (startDate && ['2019-10-20', '2020-01-15', '2020-02-01'].indexOf(startDate) <= -1));
    const onSubmit = (e) => {
        e.preventDefault();
        if (e.target.checkValidity()) {
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                openModal();
            }, 3000);
        }
    };

    const openModal = () => {
        setIsShowModal(!isShowModal);
    };

    let styles = isShowModal ? {display: "block"} : {display: "none"};
    let btnStyle = (isErrorDate || isErrorNotes) ? {cursor: "not-allowed"} : {cursor: "pointer"};
    return (
        <div className="pt-5">
            <div className="col-12">
                <div className="col-12 col-sm-6 text-left m-auto">
                    <div className="jumbotron w-100 shadow-lg">
                        <h2 style={{'textAlign': 'center', 'color': '#007bff'}}><strong>Registration</strong></h2>
                        <form action="" method="POST" noValidate className="needs-validation"
                              ref={registerForm}>
                            <div className="form-group">
                                <label htmlFor="courses" className="pr-2 font-weight-bold">Course</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        {courses.map(item => (
                                                <div key={item.id}>
                                                    <input className="form-check-input"
                                                           type="radio"
                                                           name="courseOptions"
                                                           id={item.id}
                                                           value={item.id}
                                                           checked={course === item.id}
                                                           onChange={e => setCourse(e.target.value)}
                                                    />
                                                    <label className="form-check-label pr-2"
                                                           htmlFor={item.id}>{item.label}</label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subjects" className="font-weight-bold">Subject</label>
                                <select key={course} id="subjects" className="form-control" value={subject}
                                        onChange={e => setSubject(e.target.value)}>
                                    {course ?
                                        subjects[course].map(item => (
                                                <option key={item.id} value={item.id}>{item.label}</option>
                                            )
                                        ) :
                                        <option>none</option>
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate" className="font-weight-bold">Start Date</label>
                                <input type="date"
                                       className={"form-control " +
                                       ((isErrorDate) ? "is-invalid" : "is-valid")}
                                       id="startDate"
                                       placeholder="Start Date"
                                       value={startDate}
                                       onChange={e => setStartDate(e.target.value)}
                                       required
                                />
                                {isErrorDate &&
                                <div className="invalid-feedback">
                                    {startDate ? "Your selected course and subject is not offered beginning from your selected date." : "Start Date is required."}
                                </div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="notes" className="font-weight-bold">Additional Notes</label>
                                <textarea
                                    className={"form-control " + (isErrorNotes ? "is-invalid" : "is-valid")}
                                    id="notes"
                                    placeholder="Additional notes"
                                    value={notes}
                                    maxLength={500}
                                    minLength={20}
                                    onChange={e => setNotes(e.target.value)}
                                />
                                {(isErrorNotes) &&
                                <div className="invalid-feedback">
                                    The text you entered is less than 20 or more than 500
                                </div>}
                            </div>
                            <div className="form-group" style={{'textAlign': 'center'}}>
                                <button
                                    style={btnStyle}
                                    className='btn btn-primary'
                                    type="button"
                                    disabled={isErrorDate || isErrorNotes}
                                    onClick={e => onSubmit(e)}>
                                    {isSubmitted &&
                                    <span className="spinner-border spinner-border-sm mr-2" role="status"
                                          aria-hidden="true"/>}
                                    {isSubmitted ? "Saving" : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                    {isShowModal &&
                    <>
                        <div className={'modal-backdrop show'} />
                        <div className={`modal fade ${isShowModal && 'show'}`} id="exampleModal" tabIndex="-1"
                             role="dialog"
                             aria-labelledby="exampleModalLabel" aria-hidden="true" style={styles}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <p style={{'textAlign': 'center'}}>Your course has been successfully
                                            registered.</p>
                                        <div className="float-right">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                                    onClick={() => openModal()}>Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm
