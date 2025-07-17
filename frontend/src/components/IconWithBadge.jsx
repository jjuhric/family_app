
const IconWithBadge = ({ count, Icon }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Icon size={24} />
      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -5,
            right: -5,
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '10px',
            lineHeight: '1',
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
};

export default IconWithBadge;