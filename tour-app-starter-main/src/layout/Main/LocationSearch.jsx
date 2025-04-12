import { Autocomplete, TextField, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';  // Đảm bảo bạn đã import ClearIcon
import { useState, useEffect } from "react";

// Giả lập việc gọi API
const fetchLocations = (inputText) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const locations = [
                "New York",
                "Los Angeles",
                "Chicago",
                "Houston",
                "Phoenix",
                "San Francisco",
                "Miami",
                "Dallas"
            ];
            // Lọc các địa điểm phù hợp với inputText
            const filteredLocations = locations.filter((location) =>
                location.toLowerCase().includes(inputText.toLowerCase())
            );
            resolve(filteredLocations);
        }, 1000); // Giả lập độ trễ API 1 giây
    });
};

const LocationSearch = () => {
    const [inputText, setInputText] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (inputText) {
            setLoading(true);
            fetchLocations(inputText).then((data) => {
                setOptions(data);
                setLoading(false);
            });
        } else {
            setOptions([]);
        }
    }, [inputText]);

    const handleClearInput = () => {
        setInputText("");  // Xóa chữ đã nhập
        setOptions([]);    // Xóa các kết quả gợi ý
    };

    return (
        <Autocomplete
            fullWidth
            freeSolo
            options={options}
            loading={loading}
            value={inputText}  // Cập nhật giá trị của ô nhập liệu
            onInputChange={(event, newValue) => {
                setInputText(newValue);  // Cập nhật giá trị khi người dùng nhập
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    value={inputText}  // Đồng bộ giá trị với inputText
                    placeholder="Enter location"
                    variant="standard"
                    InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                        endAdornment: (
                            <>
                                {loading ? (
                                    <CircularProgress color="inherit" size={20} />
                                ) : inputText ? (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClearInput} edge="end">
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ) : null}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default LocationSearch;
