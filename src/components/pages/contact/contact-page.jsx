import { useState } from "react";
import HeroComponent from "../../sections/hero/hero-component";
import FormComponent from "../../sections/form/form-component";
import ContactDetailsComponent from "../../sections/details/details-component";
import HeaderComponent from "../../sections/header/header-component";
import BeforeFooterCTA from "../../sections/before-footer-cta/before-footer-cta-components";
import FooterComponent from "../../sections/footer/footer-component";

import Axios from "axios";

import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import newUsersInsertRequest from "../../utility-functions/new-users-insert-request";

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		reason: "",
		message: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formData);

		Axios.post("http://localhost:3001/create-need-help", {
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			reason: formData.reason,
			message: formData.message,
		})
			.then((response) => {
				console.log("success");
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		newUsersInsertRequest(formData, "need-help");

		setFormData({
			name: "",
			email: "",
			phone: "",
			reason: "",
			message: "",
		});
	};

	const ContactPageDetails = {
		hero: {
			subheadingText: "Got any Questions?",
			headingText: "Don't Know What to Do? Let Us Assist You.",
			classHint: "contact-page-hero",
		},
	};

	const fields = [
		{
			key: "name",
			name: "name",
			type: "text",
			placeholder: "Name",
			required: true,
		},
		{
			key: "email",
			name: "email",
			type: "email",
			placeholder: "Email",
			required: true,
		},
		{
			key: "phone",
			name: "phone",
			type: "tel",
			placeholder: "Phone",
			required: true,
		},
		{
			key: "reason",
			name: "reason",
			type: "text",
			placeholder: "Reason",
			required: false,
		},
	];

	const contactDetails = [
		{
			key: "phone",
			stepNumber: <FaPhoneAlt />,
			stepName: "Phone",
			stepDescription: "(+91)63699 34757",
			stepUrl: "tel:+91 6369934757",
		},
		{
			key: "email",
			stepNumber: <MdEmail />,
			stepName: "Email",
			stepDescription: "letsdonate@gmail.com",
			stepUrl: "mailto:letsdonate@gmail.com",
		},
		{
			key: "address",
			stepNumber: <FaMapMarkerAlt />,
			stepName: "Address",
			stepDescription: "Tiruchirappalli, Tamilnadu, India",
			stepUrl: "https://goo.gl/maps/QCLpYP3yyUqhttps://www.google.com/maps/place/Tiruchirappalli,+Tamil+Nadu/@10.8160024,78.6066246,12z/data=!3m1!4b1!4m6!3m5!1s0x3baaf50ff2aecdad:0x6de02c3bedbbaea6!8m2!3d10.7904833!4d78.7046725!16zL20vMDE5Zmx2?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3DdT8HA7",
		},
	];

	return (
		<>
			<HeaderComponent />

			<HeroComponent {...ContactPageDetails.hero} />
			<FormComponent
				fields={fields}
				heading={"We're to help"}
				buttonText={"Send Message"}
				handleSubmit={handleSubmit}
				formData={formData}
				setFormData={setFormData}
			/>
			<ContactDetailsComponent contactDetails={contactDetails} />
			<BeforeFooterCTA />
			<FooterComponent />
		</>
	);
};

export default ContactPage;
