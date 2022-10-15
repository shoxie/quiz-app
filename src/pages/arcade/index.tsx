import ArcadeGame from "@/components/ArcadeGame";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function ArcadeGamePage () {
    return <ArcadeGame />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
  
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  
    return {
      props: { session }
    }
  }