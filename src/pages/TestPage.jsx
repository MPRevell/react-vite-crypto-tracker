import Banner from "../components/Banner";
import Footer from "../components/shared/Footer";
import TestTable from "../components/TestTable";
import Navbar from "../components/shared/Navbar";
import {
  Typography,
  Container,
  Toolbar,
  AppBar,
  Select,
  MenuItem,
  makeStyles,
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material";

export default function TestPage() {
  const TitleTypography = styled(Typography)({
    flex: 1,
  });

  return (
    <div>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <TitleTypography className="brand-name">
              Matt's CryptoVerse
            </TitleTypography>
            <Select
              value={""}
              className="text-sky-400"
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginLeft: 15,
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"GBP"}>GBP</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
      <Banner />
    </div>
  );
}
