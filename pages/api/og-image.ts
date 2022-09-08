import OgTemplate from 'components/OgTemplate';
import { withOGImage } from 'next-api-og-image';

export default withOGImage({
  template: {
    react: ({ title, date }) => (
      <html>
        <div
          dangerouslySetInnerHTML={{
            __html: `<head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>`
          }}
        />
        <OgTemplate title={title} date={date} />
      </html>
    )
  }
});
