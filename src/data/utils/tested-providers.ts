import { getCollection } from 'astro:content';
import { isDemoEntry } from './demo-filter';
import { getPublishableProviders } from './provider-publish-gate';

// "无忧链接是唯一有本站真实实测的服务商"这句话不应该写死在文案 JSON 里——
// 一旦以后给别的服务商也补了真实测试记录，写死的文案就会变成假话。这里改成
// 每次构建都从 tests.json 实际统计，谁在用这份统计谁就自动跟着数据变化。
export async function getTestedProviderStats() {
  const [tests, publishableProviders] = await Promise.all([
    getCollection('tests', ({ id }) => !isDemoEntry(id)),
    getPublishableProviders(),
  ]);
  const testedSlugs = [...new Set(tests.map((test) => test.data.providerId.id))];
  return {
    testedCount: testedSlugs.length,
    totalCount: publishableProviders.length,
    testedSlugs,
  };
}
