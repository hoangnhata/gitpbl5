import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Properties from "./Properties";  // Import Properties component

CardView.propTypes = {
  value: PropTypes.number,
  handleChangeTab: PropTypes.func,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function CardView(props) {
  const [tabData, setTabData] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hàm gọi API để lấy dữ liệu các tab
  const fetchTabsData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/categories");
      const data = await response.json();
      setTabData(data.result); // Lưu dữ liệu vào state
    } catch (error) {
      console.error("Error fetching tabs data: ", error);
    }
  };

  // Hàm gọi API để lấy dữ liệu properties theo id tab
  const fetchProperties = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/listings`);
      const data = await response.json();
      setProperties(data.result); // Lưu properties vào state
    } catch (error) {
      console.error("Error fetching properties data: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchTabsData khi component mount
  useEffect(() => {
    fetchTabsData();
  }, []);

  // Gọi fetchProperties khi tab thay đổi
  useEffect(() => {
    if (tabData.length > 0) {
      const currentTabData = tabData[props.value];
      fetchProperties(currentTabData.id);
    }
  }, [props.value, tabData]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={props.value}
          onChange={props.handleChangeTab}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {tabData.map((tab, index) => (
            <Tab
              key={tab.id}
              label={tab.name}
              icon={
                <img
                  src={`http://localhost:8080${tab.thumnailUrl}`}  // Kết hợp đúng tiền tố URL
                  alt={tab.name}
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                    marginRight: "15px",
                  }}
                />
              }
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                minWidth: "120px",
              }}
            />
          ))}
        </Tabs>
      </Box>

      {tabData.map((tab, index) => (
        <CustomTabPanel value={props.value} index={index} key={tab.id}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Properties properties={properties} />
          )}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
