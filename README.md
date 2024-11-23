

export default ThankYouSurvey;

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

import React from "react";
import { shallow } from "enzyme";
import { useSelector } from "react-redux";
import ThankYouSurvey from "./thank-you";
import thankyouData from "../../../assets/_json/thankyou.json";
import * as changeUtils from "../../../utils/common/change.utils";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../../../utils/common/change.utils", () => ({
  getUrl: {
    getChannelRefNo: jest.fn(),
  },
}));

describe("ThankYouSurvey Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render ThankYouSurvey component with the correct survey link", () => {
    // Mock `useSelector` to return stageSelector
    (useSelector as jest.Mock).mockReturnValue([
      {
        stageInfo: {
          products: [
            {
              product_category: "CC",
            },
          ],
        },
      },
    ]);

    // Mock `getUrl.getChannelRefNo`
    (changeUtils.getUrl.getChannelRefNo as jest.Mock).mockReturnValue({
      applicationRefNo: "12345",
    });

    // Render the component
    const wrapper = shallow(<ThankYouSurvey />);

    // Verify the rendered content
    expect(wrapper.find(".thankyou__feedback").exists()).toBe(true);
    expect(wrapper.text()).toContain(thankyouData.Survey.content_1);
    expect(wrapper.text()).toContain(thankyouData.Survey.content_2);
    expect(wrapper.text()).toContain(thankyouData.Survey.content_3);

    // Verify the survey link is constructed correctly
    const expectedLink =
      thankyouData.Survey.link +
      "&p=CC&m=sg&c=12345";
    const surveyLink = wrapper.find("a").prop("href");

    expect(surveyLink).toBe(expectedLink);
    expect(wrapper.find("a").prop("target")).toBe("_blank");
    expect(wrapper.find("a").prop("rel")).toBe("feedback noreferrer");
  });
});


import "./thank-you.scss";
import { KeyWithAnyModel } from "../../../utils/model/common-model";
import ThankYouTimeline from "./thankyou-timeline";
import ThankYouBanner from "./thankyou-banner";
import ThankYouSurvey from "./thankyou-survey"
const ThankYouCC = (props: KeyWithAnyModel) => {
  const applicationDetails = props.applicationDetails;
  const thankyou = props.thankyou;

  const getTimelineData = () => {
    
    if (!applicationDetails.isStp) {
      return thankyou[applicationDetails.thankyouProp].CCPL.timeLine;
    }
    return thankyou.CCSTP;
  };
  return (
    <>
      <ThankYouBanner
        banner_header={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.banner_header
            : thankyou.STPCCBanner.banner_header
        }
        banner_content={true}
        // banner_body_1={
        //   !applicationDetails.isStp
        //     ? thankyou[applicationDetails.thankyouProp].CCPL.banner_body_1
        //     : ""
        // }
        productName={" "}
        banner_body_2={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.banner_body_2
            : ""
        }
        resumeUrl={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.resumeUrl
            : ""
        }
      />
      <div className="thankyou__body__outer">
        <div className="thankyou__body">
          {!applicationDetails.isStp && (
            <>
              <div className="thankyou__title">
                <label>
                  {thankyou[applicationDetails.thankyouProp].CCPL.title}
                </label>
              </div>
              <div className="thankyou__content">
                <label>
                  {thankyou[applicationDetails.thankyouProp].CCPL.content}
                </label>
              </div>
            </>
          )}
          {applicationDetails.isStp && (
            <div className="thankyou__title">
              <div>
                {thankyou.STPCCBanner.banner_body_1}
                {applicationDetails.productName}
                {thankyou.STPCCBanner.banner_body_2}
              </div>
              <div>{applicationDetails.productName}</div>
              <div>{applicationDetails.cardNumber}</div>
            </div>
          )}
          <ThankYouTimeline
            title={thankyou[applicationDetails.thankyouText].timeLine}
            data={getTimelineData()}
            checkCompletedStatus={true}
            handleLink={props.showOTPPopup}
          />
          {applicationDetails.isStp && (
            <div>
              <div>
                {thankyou[applicationDetails.thankyouText].timeline_header}
              </div>
              <div>
                {thankyou[applicationDetails.thankyouText].timeline_desc}
              </div>
            </div>
          )}
          {!applicationDetails.isStp && (
            <div>
              <div className="thankyou__note__content">
                <label>{thankyou.CCPL.note_title}</label>
              </div>
              <div className="thankyou__note__content">
                <div>{thankyou.CCPL.note_content_1}</div>
                <div>{thankyou.CCPL.note_content_2}</div>
              </div>
              <div className="thankyou__note__content">
                <div>{thankyou.CCPL.note_content_3}</div>
                <div>
                  <a
                    target="_blank"
                    rel="feedback noreferrer"
                    href={thankyou.CCPL.note_link}
                  >
                    {thankyou.CCPL.note_content_4}
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="body__app-details">
            <label>{thankyou.CCPL.refId_lbl}</label>
            {props.applicationReferenceNo!}
          </div>
          <div className="body__refno">
            {applicationDetails.isStp ? (
              <>
                <button
                  onClick={(e) => props.showContinuePopup(e)}
                  className="thankyou__continue"
                >
                  {thankyou[applicationDetails.thankyouText].continueButton}
                </button>
              </>
            ) : (
              <button
                onClick={(e) => props.submitForm(e)}
                className="thankyou__continue"
              >
                {thankyou[applicationDetails.thankyouText].doneButton}
              </button>
            )}
          </div>
          <ThankYouSurvey/>
        </div>
      </div>   
    </>
  );
};

export default ThankYouCC;

import { render, screen, fireEvent } from '@testing-library/react';
import ThankYouCC from './ThankYouCC';

const mockProps = {
  applicationDetails: {
    isStp: false,
    thankyouProp: 'mockThankYouProp',
    thankyouText: 'mockThankYouText',
    productName: 'Credit Card',
    cardNumber: '1234-5678-9012-3456',
  },
  thankyou: {
    mockThankYouProp: {
      CCPL: {
        timeLine: 'Timeline Data',
        banner_header: 'Mock Header',
        banner_body_2: 'Mock Body 2',
        resumeUrl: '/resume/url',
        title: 'Mock Title',
        content: 'Mock Content',
        note_title: 'Mock Note Title',
        note_content_1: 'Mock Note Content 1',
        note_content_2: 'Mock Note Content 2',
        note_content_3: 'Mock Note Content 3',
        note_content_4: 'Mock Note Content 4',
        note_link: '/mock-note-link',
        refId_lbl: 'Reference ID',
        doneButton: 'Done',
      },
    },
    CCSTP: 'STP Timeline Data',
    STPCCBanner: {
      banner_header: 'STP Header',
      banner_body_1: 'STP Body 1',
      banner_body_2: 'STP Body 2',
    },
    mockThankYouText: {
      timeLine: 'STP Timeline',
      timeline_header: 'STP Timeline Header',
      timeline_desc: 'STP Timeline Description',
      continueButton: 'Continue',
    },
  },
  applicationReferenceNo: 'REF12345',
  showOTPPopup: jest.fn(),
  submitForm: jest.fn(),
  showContinuePopup: jest.fn(),
};

jest.mock('./thankyou-timeline', () => () => <div data-testid="thankyou-timeline" />);
jest.mock('./thankyou-banner', () => () => <div data-testid="thankyou-banner" />);
jest.mock('./thankyou-survey', () => () => <div data-testid="thankyou-survey" />);

describe('ThankYouCC Component', () => {
  test('renders correctly for non-STP flow', () => {
    render(<ThankYouCC {...mockProps} />);

    // Check ThankYouBanner
    expect(screen.getByTestId('thankyou-banner')).toBeInTheDocument();

    // Check title and content
    expect(screen.getByText('Mock Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Content')).toBeInTheDocument();

    // Check timeline
    expect(screen.getByTestId('thankyou-timeline')).toBeInTheDocument();

    // Check notes
    expect(screen.getByText('Mock Note Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Note Content 1')).toBeInTheDocument();
    expect(screen.getByText('Mock Note Content 4')).toBeInTheDocument();

    // Check reference number
    expect(screen.getByText('REF12345')).toBeInTheDocument();

    // Check Done button
    const doneButton = screen.getByText('Done');
    expect(doneButton).toBeInTheDocument();
    fireEvent.click(doneButton);
    expect(mockProps.submitForm).toHaveBeenCalled();
  });

  test('renders correctly for STP flow', () => {
    const stpProps = {
      ...mockProps,
      applicationDetails: { ...mockProps.applicationDetails, isStp: true },
    };

    render(<ThankYouCC {...stpProps} />);

    // Check ThankYouBanner
    expect(screen.getByTestId('thankyou-banner')).toBeInTheDocument();

    // Check STP timeline details
    expect(screen.getByText('STP Timeline Header')).toBeInTheDocument();
    expect(screen.getByText('STP Timeline Description')).toBeInTheDocument();

    // Check STP banner details
    expect(screen.getByText('STP Body 1')).toBeInTheDocument();
    expect(screen.getByText('STP Body 2')).toBeInTheDocument();

    // Check Continue button
    const continueButton = screen.getByText('Continue');
    expect(continueButton).toBeInTheDocument();
    fireEvent.click(continueButton);
    expect(stpProps.showContinuePopup).toHaveBeenCalled();
  });

  test('calls getTimelineData correctly for non-STP', () => {
    render(<ThankYouCC {...mockProps} />);

    // Assert that timeline data from CCPL is used
    expect(screen.getByTestId('thankyou-timeline')).toBeInTheDocument();
  });

  test('calls getTimelineData correctly for STP', () => {
    const stpProps = {
      ...mockProps,
      applicationDetails: { ...mockProps.applicationDetails, isStp: true },
    };

    render(<ThankYouCC {...stpProps} />);

    // Assert that timeline data from CCSTP is used
    expect(screen.getByTestId('thankyou-timeline')).toBeInTheDocument();
  });
});

ThankYouCC Component › renders correctly for STP flow

    TypeError: Cannot read properties of undefined (reading 'refId_lbl')

      111 |
      112 |           <div className="body__app-details">
    > 113 |             <label>{thankyou.CCPL.refId_lbl}</label>
          |                                   ^
      114 |             {props.applicationReferenceNo!}
      115 |           </div>
      116 |           <div className="body__refno">

      at refId_lbl (src/modules/dashboard/thank-you/thankyou-cc.tsx:113:35)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:16305:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20074:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21587:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27426:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26560:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26466:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26434:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25850:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25750:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:180:26)
      at render (node_modules/@testing-library/react/dist/pure.js:266:10)
      at Object.<anonymous> (src/modules/dashboard/thank-you/thankyou-cc.test.tsx:89:11)

  ● ThankYouCC Component › calls getTimelineData correctly for non-STP

    TypeError: Cannot read properties of undefined (reading 'note_title')

      89 |             <div>
      90 |               <div className="thankyou__note__content">
    > 91 |                 <label>{thankyou.CCPL.note_title}</label>
         |                                       ^
      92 |               </div>
      93 |               <div className="thankyou__note__content">

import "./thank-you.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import thankyouData from "../../../assets/_json/thankyou.json";
import { useSelector} from "react-redux";
import { getUrl } from "../../../utils/common/change.utils";


const ThankYouSurvey = ( ) => {
const thankyou: KeyWithAnyModel = thankyouData;
const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
const applicationReferenceNo = getUrl.getChannelRefNo().applicationRefNo;
const survey_link = "&p="+stageSelector[0].stageInfo.products[0].product_category+"&m=sg"+"&c="+applicationReferenceNo;

  return (
    <div className="thankyou__feedback">
    {thankyou.Survey.content_1}
    <a target="_blank" 
    rel="feedback noreferrer" 
    href={thankyou.Survey.link+survey_link} >
    {thankyou.Survey.content_2}</a>
    {thankyou.Survey.content_3}
  </div>
  );
};

export default ThankYouSurvey;

import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import ThankYouSurvey from './ThankYouSurvey';
import thankyouData from '../../../assets/_json/thankyou.json';
import { getUrl } from '../../../utils/common/change.utils';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../../../utils/common/change.utils', () => ({
  getUrl: {
    getChannelRefNo: jest.fn(),
  },
}));

describe('ThankYouSurvey Component', () => {
  beforeEach(() => {
    // Mock the Redux selector
    (useSelector as jest.Mock).mockReturnValue([
      {
        stageInfo: {
          products: [
            {
              product_category: 'mockCategory',
            },
          ],
        },
      },
    ]);

    // Mock the getUrl function
    (getUrl.getChannelRefNo as jest.Mock).mockReturnValue({
      applicationRefNo: 'mockRefNo',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders survey content correctly', () => {
    render(<ThankYouSurvey />);

    // Verify thankyouData content
    expect(screen.getByText(thankyouData.Survey.content_1)).toBeInTheDocument();
    expect(screen.getByText(thankyouData.Survey.content_2)).toBeInTheDocument();
    expect(screen.getByText(thankyouData.Survey.content_3)).toBeInTheDocument();
  });

  test('constructs survey link correctly', () => {
    render(<ThankYouSurvey />);

    // Verify survey link
    const surveyLink = screen.getByRole('link', {
      name: thankyouData.Survey.content_2,
    });

    const expectedLink = `${thankyouData.Survey.link}&p=mockCategory&m=sg&c=mockRefNo`;
    expect(surveyLink).toHaveAttribute('href', expectedLink);
  });

  test('renders a survey link with target and rel attributes', () => {
    render(<ThankYouSurvey />);

    const surveyLink = screen.getByRole('link', {
      name: thankyouData.Survey.content_2,
    });

    // Check attributes
    expect(surveyLink).toHaveAttribute('target', '_blank');
    expect(surveyLink).toHaveAttribute('rel', 'feedback noreferrer');
  });
});


import { useEffect, useState } from "react";
import "./thank-you.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import thankyouData from "../../../assets/_json/thankyou.json";
import { useSelector, useDispatch } from "react-redux";
import { getUrl } from "../../../utils/common/change.utils";
import trackEvents from "../../../services/track-events";
import {
  redirectingToIbanking,
  activateDigitalCard,
} from "../../../services/common-service";
import Model from "../../../shared/components/model/model";
import PopupModel from "../../../shared/components/popup-model/popup-model";

import ThankYouCC from "./thankyou-cc";
// import ThankYouPL from "./thankyou-pl";
import CCWithoutActivation from "./cc-without-activation";
import gaTrackEvents from "../../../services/ga-track-events";
import CCActivationSucess from "./cc-activation-success";
import ThankyouError from "./thankyou-error";
import { useNavigate } from "react-router-dom";
import ThankYouUpload from "./thankyou-upload";
import { store } from "../../../utils/store/store";

const ThankYou = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  // const applicationJourney = useSelector(
  //   (state: StoreModel) => state.stages.journeyType
  // );
  // const otpSuccessSelector = useSelector(
  //   (state: StoreModel) => state.stages.otpSuccess
  // );
  const thankyou: KeyWithAnyModel = thankyouData;
  // const [isFunding, setIsFunding] = useState(false);
  const applicationReferenceNo = stageSelector[0].stageInfo.application.application_reference;
  const [applicationDetails, setApplicationDetails] = useState({
    productCategory: "",
    productName: "",
    acct_details: [],
    account_number: "",
    thankyouProp: "NSTP",
    accountNum: "",
   thankyouText: "Common",
    thankyouFeedback: "Feedback",
    feedbackUrl: "",
    isStp: false,
    loanTenureMonths: "",
    approvedLoan: 0,
    productType: "",
    feeAmount: "",
    card_no: "",
    cardNumber: "",
    cardName: "",
    productSequenceNo: "",
  });
  // const [enableActivation, setEnableActivation] = useState<boolean>(false);
  // const [showPlatinum, setShowPlatinum] = useState<boolean>(false);
  // const [isCampaignBenefits, setIsCampaignBenefits] = useState<boolean>(false);
  const [
    showContinueWithoutActivationMsg,
    setShowContinueWithoutActivationMsg,
  ] = useState<boolean>(false);
  const [continueWithoutActivationUI, setContinueWithoutActivationUI] =
    useState(false);
  const [cardActivationSuccessUI, setCardActivationSuccessUI] = useState(false);
  const [showErrorUI, setShowerrorUI] = useState(false);

  useEffect(() => {
    setApplicationDetails((prevValue) => {
      if (
        stageSelector &&
        stageSelector[0].stageInfo && stageSelector[0].stageInfo.products &&
        stageSelector[0].stageInfo.products.length >= 1
      ) {
        prevValue.productCategory =
          stageSelector[0].stageInfo.products[0].product_category;
        prevValue.productName = stageSelector[0].stageInfo.products[0].name;
        prevValue.productSequenceNo =
          stageSelector[0].stageInfo.products[0].product_sequence_number;
        prevValue.productType =
          stageSelector[0].stageInfo.products[0].product_type;
        if (
          stageSelector[0].stageInfo.products[0].acct_details &&
          stageSelector[0].stageInfo.products[0].acct_details.length >= 1
        ) {
          prevValue.acct_details =
            stageSelector[0].stageInfo.products[0].acct_details;
          prevValue.account_number =
            stageSelector[0].stageInfo.products[0].acct_details[0].account_number;
          prevValue.card_no =
            stageSelector[0].stageInfo.products[0].acct_details[0].card_no;
        }
      }
      prevValue.thankyouProp = "NSTP";
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.account_number
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.accountNum = prevValue.account_number;
      }
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.card_no
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.cardNumber = prevValue.card_no;
      }
      prevValue.isStp = prevValue.thankyouProp === "STP" ? true : false;
      prevValue.feedbackUrl =
        thankyou[prevValue.thankyouFeedback]["url_prefix"] +
        thankyou[prevValue.thankyouFeedback]["casa"] +
        thankyou[prevValue.thankyouFeedback]["url_suffix"] +
        applicationReferenceNo!;

      // prevValue = setSTPData(prevValue);
      if (prevValue.isStp) {
        if (prevValue.productCategory === "CC") {
          if (stageSelector[0].stageInfo.applicants) {
            if (stageSelector[0].stageInfo.applicants.embossed_name_a_1) {
              prevValue.cardName =
                stageSelector[0].stageInfo.applicants.embossed_name_a_1.toUpperCase();
            }
            if (prevValue.card_no) {
              prevValue.cardNumber = prevValue.card_no;
            }
          }
         } 
        
      }
      return { ...prevValue };
    });
    if (stageSelector[0] && stageSelector[0].stageId && getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload) {
      gaTrackEvents.pageView(stageSelector[0].stageId);
    }
    if(getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload){
    trackEvents.triggerAdobeEvent("formSubmit");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (otpSuccessSelector) {
  //     activateCard();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [otpSuccessSelector]);
  // const setSTPData = (prevValue: any) => {
  //   if (prevValue.isStp && prevValue.productCategory) {
  //     if (prevValue.productCategory === "CC") {
  //       prevValue.feedbackUrl =
  //         thankyou[prevValue.thankyouFeedback]["url_prefix"] +
  //         thankyou[prevValue.thankyouFeedback]["cc"] +
  //         thankyou[prevValue.thankyouFeedback]["url_suffix"] +
  //         applicationReferenceNo!;
  //     } else if (prevValue.productCategory === "PL") {
  //       prevValue.feedbackUrl =
  //         thankyou[prevValue.thankyouFeedback]["url_prefix"] +
  //         thankyou[prevValue.thankyouFeedback]["pl"] +
  //         thankyou[prevValue.thankyouFeedback]["url_suffix"] +
  //         applicationReferenceNo!;
  //     }
  //   }
  //   return prevValue;
  // };

  const submitForm = (event:React.FormEvent<EventTarget>) => {
    if (
      stageSelector &&
      (stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IX" || stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IM")
     ) {
    //   // goToIBanking(event);
     }
     else {
      window.location.href = `${process.env.REACT_APP_HOME_PAGE_URL}`;
    }
    event.preventDefault();
  };

  const continueWithoutActivation = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(true);
  };
  const showContinuePopup = (event: React.FormEvent<EventTarget>) => {
    setShowContinueWithoutActivationMsg(true);
    event.preventDefault();
  };
  const handlePopupBackButton = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(false);
  };
  const showOTPPopup = () => {
    navigate("/otp");
  };
  // const goToIBanking = (event: React.FormEvent<EventTarget>) => {
  //   if (getUrl.getParameterByName("source") === "scm") {
  //     //Ibanking redirection for app
  //     window.location.href = `${process.env.REACT_APP_IBANKING_SC_MOBILE}`;
  //   }  else if(getUrl.getUpdatedStage().ccplChannel=== "MBNK") {
  //     const redirectUrl =  `${process.env.REACT_APP_IBANKING_SC_MOBILE_TRANSFER}`;
  //     window.location.href = redirectUrl;
  //   }else {
  //     redirectingToIbanking();
  //   }
  //   event.preventDefault();
  // };
  // const activateCard = () => {
  //   setShowContinueWithoutActivationMsg(false);
  //   setContinueWithoutActivationUI(false);
  //   setShowerrorUI(false);
  //   dispatch(activateDigitalCard(applicationDetails)).then((result: any) => {
  //     if (result.status && result.status.toUpperCase() === "SUCCESS") {
  //       setCardActivationSuccessUI(true);
  //     } else {
  //       setShowerrorUI(true);
  //     }
  //   });
  // };
  return (
    <>
      {applicationDetails && (
        <form className="form">
          <div className="app thankyou">
            <div className="app__body">
              <div className="app__right">
                <div className="thankyou__container">
                  {!showErrorUI &&
                    !continueWithoutActivationUI &&
                    !cardActivationSuccessUI && (
                      <>
                      {(getUrl.getParameterByName("auth") === "upload" || store.getState().stages.isDocumentUpload) &&(
                          <ThankYouUpload
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          submitForm={submitForm}
                        />
                        )}
                       
                        {applicationDetails.productCategory === "CC" && (
                          <ThankYouCC
                            applicationDetails={applicationDetails}
                            thankyou={thankyou}
                            applicationReferenceNo={applicationReferenceNo}
                            submitForm={submitForm}
                            // activateCard={activateCard}
                            showContinuePopup={showContinuePopup}
                            showOTPPopup={showOTPPopup}
                          />
                        )}
                       
                        {showContinueWithoutActivationMsg && (
                          <PopupModel displayPopup={true}>
                            <Model
                              name="CCThankYou"
                              handlebuttonClick={handlePopupBackButton}
                              handleContinueWithoutActivation={
                                continueWithoutActivation
                              }
                            />
                          </PopupModel>
                        )}
                      </>
                    )}
                  {applicationDetails.productCategory === "CC" && (
                    <>
                      {continueWithoutActivationUI && (
                        <CCWithoutActivation
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          // goToIBanking={goToIBanking}
                        />
                      )}
                      {cardActivationSuccessUI && (
                        <CCActivationSucess
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          // goToIBanking={goToIBanking}
                        />
                      )}
                    </>
                  )}
                  {showErrorUI && (
                    <ThankyouError
                      applicationDetails={applicationDetails}
                      thankyou={thankyou}
                      applicationReferenceNo={applicationReferenceNo}
                      // goToIBanking={goToIBanking}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ThankYou;


import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ThankYou from "./ThankYou";
import { store } from "../../../utils/store/store";
import * as gaTrackEvents from "../../../services/ga-track-events";
import * as trackEvents from "../../../services/track-events";
import thankyouData from "../../../assets/_json/thankyou.json";

jest.mock("../../../services/ga-track-events", () => ({
  pageView: jest.fn(),
}));

jest.mock("../../../services/track-events", () => ({
  triggerAdobeEvent: jest.fn(),
}));

const mockStageSelector = [
  {
    stageInfo: {
      application: {
        application_reference: "mockApplicationRef123",
      },
      products: [
        {
          product_category: "CC",
          name: "Credit Card",
          product_sequence_number: "001",
          product_type: "Card",
          acct_details: [
            {
              account_number: "123456789",
              card_no: "987654321",
            },
          ],
        },
      ],
      applicants: {
        auth_mode_a_1: "IX",
        embossed_name_a_1: "Test User",
      },
    },
    stageId: "mockStageId",
  },
];

jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) => fn({ stages: { stages: mockStageSelector } })),
  useDispatch: jest.fn(() => jest.fn()),
}));

jest.mock("../../../utils/common/change.utils", () => ({
  getUrl: {
    getParameterByName: jest.fn((name) => (name === "auth" ? "upload" : null)),
  },
}));

jest.mock("../../../shared/components/model/model", () => () => (
  <div>Mocked Model Component</div>
));

jest.mock("../../../shared/components/popup-model/popup-model", () => () => (
  <div>Mocked PopupModel Component</div>
));

jest.mock("./thankyou-cc", () => () => (
  <div>Mocked ThankYouCC Component</div>
));

jest.mock("./thankyou-upload", () => () => (
  <div>Mocked ThankYouUpload Component</div>
));

jest.mock("./cc-without-activation", () => () => (
  <div>Mocked CCWithoutActivation Component</div>
));

jest.mock("./cc-activation-success", () => () => (
  <div>Mocked CCActivationSuccess Component</div>
));

jest.mock("./thankyou-error", () => () => (
  <div>Mocked ThankYouError Component</div>
));

describe("ThankYou Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThankYou />
        </BrowserRouter>
      </Provider>
    );

  test("renders the ThankYou component correctly", () => {
    renderComponent();
    expect(screen.getByText("Mocked ThankYouUpload Component")).toBeInTheDocument();
  });

  test("renders ThankYouCC component when productCategory is CC", () => {
    renderComponent();
    expect(screen.getByText("Mocked ThankYouCC Component")).toBeInTheDocument();
  });

  test("calls gaTrackEvents.pageView and trackEvents.triggerAdobeEvent", () => {
    renderComponent();
    expect(gaTrackEvents.pageView).toHaveBeenCalledWith("mockStageId");
    expect(trackEvents.triggerAdobeEvent).toHaveBeenCalledWith("formSubmit");
  });

  test("handles showContinuePopup and displays PopupModel", () => {
    renderComponent();
    const continueButton = screen.getByText("Mocked ThankYouCC Component");
    act(() => {
      fireEvent.click(continueButton);
    });
    expect(screen.getByText("Mocked PopupModel Component")).toBeInTheDocument();
  });

  test("displays CCWithoutActivation UI when continueWithoutActivation is invoked", () => {
    renderComponent();
    act(() => {
      fireEvent.click(screen.getByText("Mocked ThankYouCC Component"));
    });
    expect(screen.getByText("Mocked CCWithoutActivation Component")).toBeInTheDocument();
  });

  test("displays CCActivationSuccess UI on activation success", () => {
    renderComponent();
    act(() => {
      fireEvent.click(screen.getByText("Mocked ThankYouCC Component"));
    });
    expect(screen.getByText("Mocked CCActivationSuccess Component")).toBeInTheDocument();
  });

  test("renders ThankYouError component on error UI display", () => {
    renderComponent();
    act(() => {
      fireEvent.click(screen.getByText("Mocked ThankYouCC Component"));
    });
    expect(screen.getByText("Mocked ThankYouError Component")).toBeInTheDocument();
  });
});

import "./review-page.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import reviewpageData from "../../../assets/_json/review.json";
import { authenticateType } from "../../../utils/common/change.utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLoader,
  getProductCategory,
} from "../../../services/common-service";
import Checkbox from "../../../shared/components/checkbox/checkbox";
import TooltipModel from "../../../shared/components/model/tooltip-model";

const ReviewPage = (props: KeyWithAnyModel) => {
  const dispatch = useDispatch();
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const reviewdata: KeyWithAnyModel = reviewpageData;
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isHideTooltipIcon, setIsHideTooltipIcon] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const rpAuthInfo =
    authenticateType() === "myinfo" ? reviewdata.myinfo : reviewdata.manual;
  const [productDetails, setProductDetails] = useState({
    productName: "",
  });
  const [filterLinkList, setFilterLinkList] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  useEffect(() => {
    dispatch(dispatchLoader(false));
    setProductDetails((prevValue) => {
      if (
        stageSelector &&
        stageSelector[0].stageInfo &&
        stageSelector[0].stageInfo.products.length >= 1
      ) {
        prevValue.productName = stageSelector[0].stageInfo.products[0].name;
      }
      return { ...prevValue };
    });

    const productCtg = getProductCategory(stageSelector[0].stageInfo.products);
    setProductCategory(productCtg);
    const checkProductCategory =
      productCtg === "CA" || productCtg === "SA" ? true : false;
    setIsHideTooltipIcon(checkProductCategory);
    if (checkProductCategory === true) {
      setIsChecked(true);
    }

    let reviewLinks =
      productCtg === "PL" ? reviewdata.PLLinks : reviewdata.CCPLReviewContent;
    const fliteredLink: any = Object.entries(reviewLinks.contentLink).filter(
      (link: KeyWithAnyModel) => {
        return link;
      }
    );
    setFilterLinkList(fliteredLink);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isHideTooltipIcon) {
      props.updateCheckboxStatus(true);
    } else {
      props.updateCheckboxStatus(isChecked);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return (
    <>
      {/*CASA begins */}
      {productDetails && isHideTooltipIcon === true && (
        <div className="field__group">
          <div className="review__content">
            <label className="review__content--header">
              <p>{reviewdata.confirm.reviewPageHeader1}</p>
            </label>
            {rpAuthInfo.header && <label>{rpAuthInfo.header}</label>}
            {rpAuthInfo.reviewDesc_1 && (
              <div className="review__content--body">
                <p>
                  {rpAuthInfo.reviewDesc_1} {productDetails.productName}{" "}
                  {rpAuthInfo.reviewDesc_2}
                </p>
              </div>
            )}
            {rpAuthInfo.reviewMyInfoDesc_1 && (
              <div className="review__content--body">
                {rpAuthInfo.reviewMyInfoDesc_1 && (
                  <p>{rpAuthInfo.reviewMyInfoDesc_1}</p>
                )}
                {rpAuthInfo.reviewMyInfoDesc_1 && (
                  <ol type="a">
                    <li>{rpAuthInfo.reviewMyInfoDesc_2}</li>
                    <li>{rpAuthInfo.reviewMyInfoDesc_3}</li>
                    <li>{rpAuthInfo.reviewMyInfoDesc_4}</li>
                  </ol>
                )}
                {rpAuthInfo.reviewMyInfoDesc_5 && (
                  <p>
                    {rpAuthInfo.reviewMyInfoDesc_5} {productDetails.productName}{" "}
                    {rpAuthInfo.reviewMyInfoDesc_6}
                  </p>
                )}
              </div>
            )}
            <label>{reviewdata.confirm.reviewDesc}</label>
            <div className="review__content--body">
              <p>{reviewdata.confirm.reviewDesc_1}</p>
              <ol>
                <li>{reviewdata.confirm.reviewDesc_2}</li>
                <li>{reviewdata.confirm.reviewDesc_3}</li>
                <li>{reviewdata.confirm.reviewDesc_4}</li>
              </ol>
              <p>{reviewdata.confirm.reviewDesc_5}</p>
              <p>{reviewdata.confirm.reviewDesc_6}</p>
              <p>{reviewdata.confirm.reviewDesc_7}</p>
            </div>
          </div>
        </div>
      )}
      {/*CASA ends */}
      {/*CCPL begins */}
      {isHideTooltipIcon === false && (
        <>
          <div className="review__ccpl__content">
            <div className="review__title">
              <div className="review__title__label">
              <p>{reviewdata.CCPL.reviewTitle1}</p>
            </div>            
            <div className="tool-tip__icon">
              <div
                className="tool-tip"
                onClick={(event) =>
                  setIsTooltipOpen(isTooltipOpen ? false : true)
                }
              ></div>
            </div>             
            </div>
            {productCategory === "PL" && (
              <>
                <div className="review__top__content">
                  <div>{reviewdata.PLLinks.contentStart}</div>
                  {filterLinkList.map((links: KeyWithAnyModel) => {
                    return (
                      <>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={links[1].path}
                        >
                          {links[1].name},
                        </a>
                      </>
                    );
                  })}
                  {reviewdata.CCPLReviewContent.contentLinkDescp}
                </div>
                <div className="review__top__content">
                  {reviewdata.PL.reviewContent1}
                </div>
              </>
            )}
          </div>
          <div className="review__checkbox">
          <Checkbox
              reviewHeader={reviewdata.CCPL.reviewHeader}
              reviewDescp1={reviewdata.CCPL.reviewDescp1}
              reviewDescpoint1={reviewdata.CCPL.reviewDescpoint1}
              reviewDescpoint2={reviewdata.CCPL.reviewDescpoint2}
              reviewDescp2={reviewdata.CCPL.reviewDescp2}
              reviewDescp3={reviewdata.CCPL.reviewDescp3}
              reviewDescp4={reviewdata.CCPL.reviewDescp4}
              checkedStatus={isChecked}
              setCheckedStatus={setIsChecked}
            />                        
          </div>
          {productCategory === "CC" && (
            <div className="review__ccpl__content">
              <div className="review__content--header">
                <label>{reviewdata.CCPLReviewContent.contentHeading}</label>
              </div>
              <div>
                {reviewdata.CCPLReviewContent.contentStart}
                {filterLinkList.map((links: KeyWithAnyModel) => {
                  return (
                    <>
                      <a target="_blank" rel="noreferrer" href={links[1].path}>
                        {links[1].name},
                      </a>
                    </>
                  );
                })}
                {reviewdata.CCPLReviewContent.contentLinkDescp},
                {reviewdata.CCPLReviewContent.contentEnd}
              </div>
            </div>
          )}
        </>
      )}
      {/*CCPL ends */}
      {isTooltipOpen && (
        <TooltipModel
          isTooltipOpen={isTooltipOpen}
          data="review"
          setIsTooltipOpen={setIsTooltipOpen}
          productCategory={productCategory}
        />
      )}
    </>
  );
};

export default ReviewPage;

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ReviewPage from "./review-page";
import reviewpageData from "../../../assets/_json/review.json";

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

jest.mock("../../../services/common-service", () => ({
  dispatchLoader: jest.fn(),
  getProductCategory: jest.fn(() => "CC"),
}));

jest.mock("../../../utils/common/change.utils", () => ({
  authenticateType: jest.fn(() => "manual"),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("ReviewPage Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      stages: {
        stages: [
          {
            stageInfo: {
              products: [
                { name: "Product Name", category: "CC" },
              ],
            },
          },
        ],
      },
    });
  });

  const renderComponent = (props = {}) => {
    render(
      <Provider store={store}>
        <ReviewPage {...props} />
      </Provider>
    );
  };

  test("renders CASA content when product category is CA or SA", () => {
    jest.spyOn(require("../../../services/common-service"), "getProductCategory").mockReturnValue("CA");
    renderComponent();

    expect(screen.getByText(reviewpageData.confirm.reviewPageHeader1)).toBeInTheDocument();
    expect(screen.getByText(reviewpageData.confirm.reviewDesc_1)).toBeInTheDocument();
  });

  test("renders CCPL content when product category is CC", () => {
    jest.spyOn(require("../../../services/common-service"), "getProductCategory").mockReturnValue("CC");
    renderComponent();

    expect(screen.getByText(reviewpageData.CCPL.reviewTitle1)).toBeInTheDocument();
    expect(screen.getByText(reviewpageData.CCPLReviewContent.contentHeading)).toBeInTheDocument();
  });

  test("displays tooltip when tooltip icon is clicked", () => {
    renderComponent();

    const tooltipIcon = screen.getByClass("tool-tip");
    fireEvent.click(tooltipIcon);

    expect(screen.getByText("review")).toBeInTheDocument();
  });

  test("checks if checkbox is selected when isHideTooltipIcon is true", () => {
    jest.spyOn(require("../../../services/common-service"), "getProductCategory").mockReturnValue("CA");
    const mockUpdateCheckboxStatus = jest.fn();

    renderComponent({ updateCheckboxStatus: mockUpdateCheckboxStatus });

    expect(mockUpdateCheckboxStatus).toHaveBeenCalledWith(true);
  });

  test("handles checkbox state update", () => {
    const mockUpdateCheckboxStatus = jest.fn();

    renderComponent({ updateCheckboxStatus: mockUpdateCheckboxStatus });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockUpdateCheckboxStatus).toHaveBeenCalled();
  });

  test("renders product name", () => {
    renderComponent();

    expect(screen.getByText("Product Name")).toBeInTheDocument();
  });

  test("renders links for CCPL content", () => {
    jest.spyOn(require("../../../services/common-service"), "getProductCategory").mockReturnValue("CC");
    renderComponent();

    const links = reviewpageData.CCPLReviewContent.contentLink;
    Object.entries(links).forEach(([key, value]) => {
      expect(screen.getByText(value.name)).toBeInTheDocument();
    });
  });

  test("renders PL-specific content when product category is PL", () => {
    jest.spyOn(require("../../../services.common-service"), "getProductCategory").mockReturnValue("PL");
    renderComponent();

    expect(screen.getByText(reviewpageData.PL.reviewContent1)).toBeInTheDocument();
  });

  test("dispatches loader on mount", () => {
    renderComponent();

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  test("updates props.updateCheckboxStatus based on isChecked", () => {
    const mockUpdateCheckboxStatus = jest.fn();

    renderComponent({ updateCheckboxStatus: mockUpdateCheckboxStatus });

    expect(mockUpdateCheckboxStatus).toHaveBeenCalledWith(false);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockUpdateCheckboxStatus).toHaveBeenCalledWith(true);
  });

  test("renders tooltip icon when product category is CC", () => {
    renderComponent();

    const tooltipIcon = screen.getByClass("tool-tip__icon");
    expect(tooltipIcon).toBeInTheDocument();
  });
});

import "./review-page.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import reviewpageData from "../../../assets/_json/review.json";
import { authenticateType } from "../../../utils/common/change.utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLoader,
  getProductCategory,
} from "../../../services/common-service";
import Checkbox from "../../../shared/components/checkbox/checkbox";
//import TooltipModel from "../../../shared/components/model/tooltip-model";

const ReviewPage = (props: KeyWithAnyModel) => {
  const dispatch = useDispatch();
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const reviewdata: KeyWithAnyModel = reviewpageData;
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isHideTooltipIcon, setIsHideTooltipIcon] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  // const rpAuthInfo =
  //   authenticateType() === "myinfo" ? reviewdata.myinfo : reviewdata.manual;
  const [productDetails, setProductDetails] = useState({
    productName: "",
  });
  const [filterLinkList, setFilterLinkList] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  useEffect(() => {
    dispatch(dispatchLoader(false));
    setProductDetails((prevValue) => {
      if (
        stageSelector &&
        stageSelector[0].stageInfo &&
        stageSelector[0].stageInfo.products.length >= 1
      ) {
        prevValue.productName = stageSelector[0].stageInfo.products[0].name;
      }
      return { ...prevValue };
    });

    const productCtg = getProductCategory(stageSelector[0].stageInfo.products);
    setProductCategory(productCtg);
    const checkProductCategory =
      productCtg === "CA" || productCtg === "SA" ? true : false;
    setIsHideTooltipIcon(checkProductCategory);
    if (checkProductCategory === true) {
      setIsChecked(true);
    }

    let reviewLinks =
      productCtg === "PL" ? reviewdata.PLLinks : reviewdata.CCPLReviewContent;
    const fliteredLink: any = Object.entries(reviewLinks.contentLink).filter(
      (link: KeyWithAnyModel) => {
        return link;
      }
    );
    setFilterLinkList(fliteredLink);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   if (isHideTooltipIcon) {
  //     props.updateCheckboxStatus(true);
  //   } else {
  //     props.updateCheckboxStatus(isChecked);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isChecked]);

  return (
    <>
      {/* CASA begins
      {productDetails && isHideTooltipIcon === true && (
        <div className="field__group">
          <div className="review__content">
            <label className="review__content--header">
              <p>{reviewdata.confirm.reviewPageHeader1}</p>
            </label>
            {rpAuthInfo.header && <label>{rpAuthInfo.header}</label>}
            {rpAuthInfo.reviewDesc_1 && (
              <div className="review__content--body">
                <p>
                  {rpAuthInfo.reviewDesc_1} {productDetails.productName}{" "}
                  {rpAuthInfo.reviewDesc_2}
                </p>
              </div>
            )}
            {rpAuthInfo.reviewMyInfoDesc_1 && (
              <div className="review__content--body">
                {rpAuthInfo.reviewMyInfoDesc_1 && (
                  <p>{rpAuthInfo.reviewMyInfoDesc_1}</p>
                )}
                {rpAuthInfo.reviewMyInfoDesc_1 && (
                  <ol type="a">
                    <li>{rpAuthInfo.reviewMyInfoDesc_2}</li>
                    <li>{rpAuthInfo.reviewMyInfoDesc_3}</li>
                    <li>{rpAuthInfo.reviewMyInfoDesc_4}</li>
                  </ol>
                )}
                {rpAuthInfo.reviewMyInfoDesc_5 && (
                  <p>
                    {rpAuthInfo.reviewMyInfoDesc_5} {productDetails.productName}{" "}
                    {rpAuthInfo.reviewMyInfoDesc_6}
                  </p>
                )}
              </div>
            )}
            <label>{reviewdata.confirm.reviewDesc}</label>
            <div className="review__content--body">
              <p>{reviewdata.confirm.reviewDesc_1}</p>
              <ol>
                <li>{reviewdata.confirm.reviewDesc_2}</li>
                <li>{reviewdata.confirm.reviewDesc_3}</li>
                <li>{reviewdata.confirm.reviewDesc_4}</li>
              </ol>
              <p>{reviewdata.confirm.reviewDesc_5}</p>
              <p>{reviewdata.confirm.reviewDesc_6}</p>
              <p>{reviewdata.confirm.reviewDesc_7}</p>
            </div>
          </div>
        </div>
      )} */}
      {/*CASA ends */}
      {/*CCPL begins */}
      {isHideTooltipIcon === false && (
        <>
          <div className="review__ccpl__content">
            <div className="review__title">
              <div className="review__title__label">
              <p>{reviewdata.CCPL.reviewTitle1}</p>
            </div>            
            <div className="tool-tip__icon">
              <div
                className="tool-tip"
                onClick={(event) =>
                  setIsTooltipOpen(isTooltipOpen ? false : true)
                }
              ></div>
            </div>             
            </div>
            {/* {productCategory === "PL" && (
              <>
                <div className="review__top__content">
                  <div>{reviewdata.PLLinks.contentStart}</div>
                  {filterLinkList.map((links: KeyWithAnyModel) => {
                    return (
                      <>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={links[1].path}
                        >
                          {links[1].name},
                        </a>
                      </>
                    );
                  })}
                  {reviewdata.CCPLReviewContent.contentLinkDescp}
                </div>
                <div className="review__top__content">
                  {reviewdata.PL.reviewContent1}
                </div>
              </>
            )} */}
          </div>
          <div className="review__checkbox">
          <Checkbox
              reviewHeader={reviewdata.CCPL.reviewHeader}
              reviewDescp1={reviewdata.CCPL.reviewDescp1}
              reviewDescpoint1={reviewdata.CCPL.reviewDescpoint1}
              reviewDescpoint2={reviewdata.CCPL.reviewDescpoint2}
              reviewDescp2={reviewdata.CCPL.reviewDescp2}
              reviewDescp3={reviewdata.CCPL.reviewDescp3}
              reviewDescp4={reviewdata.CCPL.reviewDescp4}
              checkedStatus={isChecked}
              setCheckedStatus={setIsChecked}
            />                        
          </div>
          {productCategory === "CC" && (
            <div className="review__ccpl__content">
              <div className="review__content--header">
                <label>{reviewdata.CCPLReviewContent.contentHeading}</label>
              </div>
              <div>
                {reviewdata.CCPLReviewContent.contentStart}
                {filterLinkList.map((links: KeyWithAnyModel) => {
                  return (
                    <>
                      <a target="_blank" rel="noreferrer" href={links[1].path}>
                        {links[1].name},
                      </a>
                    </>
                  );
                })}
                {reviewdata.CCPLReviewContent.contentLinkDescp},
                {reviewdata.CCPLReviewContent.contentEnd}
              </div>
            </div>
          )}
        </>
      )}
      {/*CCPL ends */}
      {/* {isTooltipOpen && (
        <TooltipModel
          isTooltipOpen={isTooltipOpen}
          data="review"
          setIsTooltipOpen={setIsTooltipOpen}
          productCategory={productCategory}
        />
      )} */}
    </>
  );
};

export default ReviewPage;
