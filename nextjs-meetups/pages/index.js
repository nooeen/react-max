import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://thumbs.dreamstime.com/b/television-screen-color-test-pattern-tv-bars-shapes-127218471.jpg",
    address: "test address",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://thumbs.dreamstime.com/b/television-screen-color-test-pattern-tv-bars-shapes-127218471.jpg",
    address: "test address",
    description: "This is a second meetup",
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image:
      "https://thumbs.dreamstime.com/b/television-screen-color-test-pattern-tv-bars-shapes-127218471.jpg",
    address: "test address",
    description: "This is a third meetup",
  },
];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   //run for every request
//   //fetch data from api - code ran on server

//   const req = context.req;
//   const res = context.res;

//   return {
//     props: DUMMY_MEETUPS,
//   };
// }

export async function getStaticProps() {
  // run every ... seconds
  const client = await MongoClient.connect(
    "mongodb+srv://neeoon:07032001@maincluster.i7dlu.mongodb.net/reactmax?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, //revalidate every 1 seconds
  }; //mandatory
}

export default HomePage;
