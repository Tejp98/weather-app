import WeatherCard from '../components/WeatherCard';
import Layout from '../layout/DefaultLayout';
import { getWeatherFromCity } from '../services';


export default function Weather(props) {

  return (
    <div >
      <Layout>
        <WeatherCard
          data={props.data}
        />
      </Layout>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { cityName, date } = context.query;

  let data = {};
  const redirectObject = {
    redirect: {
      permanent: false,
      destination: "/404"
    }
  };
  try {
    const response = await getWeatherFromCity(encodeURIComponent(cityName), encodeURIComponent(date));

    data= response.data

    if (!data) {
      return redirectObject
    }
  }
  catch (error) {
    console.log("🚀 ~ file: location.jsx ~ line 32 ~ getServerSideProps ~ error", error)
    return redirectObject;
  }

  return {
    props: data,
  }
}
