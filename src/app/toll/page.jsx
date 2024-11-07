import Spinner from '@/components/spinner';
import TollForm from '@/components/TollForm';
import dynamic from 'next/dynamic';

const TollMap = dynamic(() => import('@/components/tollmap'), { loading: () => <Spinner />, ssr: false });

const TollPage = () => {
    
  return (
    <section className="flex flex-col md:flex-row justify-between">
        <article className="bg-white w-full lg:w-1/3">
            <TollForm />
        </article>
        <article className="overflow-hidden w-full lg:w-2/3">
            <TollMap />
        </article>
    </section>
  )
}

export default TollPage;