import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useLocation } from "react-router-dom";

const StepTabs = (props) => {
  const location = useLocation()
  const [activeTab, setActiveTab] = React.useState(props.activeTab || (location?.search  ? 3 :0));

  return (
    <React.Fragment>
      <Nav
        className={`vx-wizard ${props.className ? props.className : ""}`}
        style={{
          borderBottom: "1px solid lightgrey",
        }}
        tabs
      >
        {props.tabs.map((item, i) => {
          return (
            <NavItem
              className="step-wrapper"
              key={i}
              onClick={() => setActiveTab(i)}
            >
              <NavLink
                className={classnames({
                  active: activeTab === i ? true : false,
                  done: i < activeTab,
                })}
              >
                <span className="step-text">{item.title}</span>
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      <TabContent
        className={`vx-wizard-content ${
          props.tabPaneClass ? props.tabPaneClass : ""
        }`}
        activeTab={activeTab}
      >
        {props.tabs.map((item, i) => {
          return (
            <TabPane
              className={`step-content step-${i}-content`}
              key={i}
              tabId={i}
            >
              {item.content}
            </TabPane>
          );
        })}
      </TabContent>
    </React.Fragment>
  );
};

StepTabs.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.array.isRequired,
  validate: PropTypes.bool,
  activeTab: PropTypes.number,
};

export default StepTabs;
