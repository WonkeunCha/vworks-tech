import insightsData from '@/data/insights.json';
import InsightsClient from './InsightsClient';

export const revalidate = 3600;

export default function InsightsPage() {
  return <InsightsClient articles={insightsData.articles} />;
}
