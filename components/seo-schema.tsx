/**
 * SEO Schema 结构化数据组件
 * 用于在页面头部插入 JSON-LD 脚本标签
 */

interface SEOSchemaProps {
  schema: any;
}

export function SEOSchema({ schema }: SEOSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * 多个Schema组件
 */
interface MultiSEOSchemaProps {
  schemas: any[];
}

export function MultiSEOSchema({ schemas }: MultiSEOSchemaProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
