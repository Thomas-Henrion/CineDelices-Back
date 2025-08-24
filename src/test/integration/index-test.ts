import app from "./app";
import config from "../../utils/dotenv";

app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});
