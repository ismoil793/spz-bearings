export function getStaticProps({locale}) {
    return {
      props: {
        locale
      }
    }
  }

const SimpleMultiLanguageWrapper = (props) => {
    return (
        <span onClick={()=>console.log(props)}>{props.locale} testing</span>
    )
}
export default SimpleMultiLanguageWrapper;