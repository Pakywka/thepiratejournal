import { toHtml } from '@/helpers/toHtml';
import { Block } from '@/interfaces/block.interface';

import styles from './Body.module.scss';

const Body: React.FC<{ body: Block[] }> = ({ body }) => {
  const getBodyContent = () => {
    return toHtml(body);
  };
  return (
    <div className={styles.root}>
      <div dangerouslySetInnerHTML={{ __html: getBodyContent() }} className={styles.content} />
    </div>
  );
};

export default Body;