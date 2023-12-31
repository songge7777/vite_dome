import * as React from "react";
import Header from "@/components/home/header";
import "@/styles/pages/agreement.scss";
import { useLocation } from "react-router-dom";

const Agreement = () => {
  const [type, setType] = React.useState("");
  const routeConfig = useLocation();
  const getInit = () => { };
  React.useEffect(() => {
    const code = routeConfig.search.slice(1).split("=")[1];
    setType(code);
    getInit();
  }, []);
  return (
    <div className="viewPosition_layout">
      <Header />
      <div className="viewPosition_lists">
        <div className="viewPosition_lists_content">
          {Number(type) === 1 &&
            <div className="viewPosition_lists_content_left">
              <p>隐私政策</p>
              <p>
                本产品尊重并保护所有使用网络服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，会按照本隐私权政策的规定使用和披露您的个人信息。但将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本产品不会将这些信息对外披露或向第三方提供。本产品会不时更新本隐私权政策。您在同意本产品网络服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于用户服务协议不可分割的一部分。
              </p>
              <p>1.适用范围</p>
              <p>a)在您注册本产品帐号时，</p>
              <p>
                您根据本产品要求提供的个人注册信息（商家应法律法规要求需公示的企业名称及相关工商注册信息除外）；
              </p>
              <p>
                b)在您使用本产品网络服务，或访问本产品平台网页时，本产品自动接收并记录的您的浏览器和cookie信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；
              </p>
              <p>
                c)
                本产品通过合法途径从商业伙伴处取得的用户个人数据。您了解并同意，以下信息不适用本隐私权政策：
              </p>
              <p>d)您在使用本产品平台提供的搜索服务时输入的关键字信息；</p>
              <p>2.信息使用</p>
              <p>
                a)
                本产品不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本产品（含本产品关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。
              </p>
              <p>
                b)
                本产品亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本产品平台用户如从事上述活动，一经发现，本产品有权立即终止与该用户的服务协议。
              </p>
              <p>
                c)为服务用户的目的，本产品可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与本产品合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。
              </p>
              <p>3.信息披露&nbsp;</p>
              <p>
                在如下情况下，本产品将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：
              </p>
              <p>a)经您事先同意，向第三方披露；</p>
              <p>
                b)为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；
              </p>
              <p>
                c)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；
              </p>
              <p>
                d)如您出现违反中国有关法律、法规或者本产品服务协议或相关规则的情况，需要向第三方披露；
              </p>
              <p>
                e)如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；
              </p>
              <p>
                f)在本产品平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本产品有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。
              </p>
              <p>g)其它本产品根据法律、法规或者网站政策认为合适的披露。</p>
              <p>4.信息存储和交换&nbsp;</p>
              <p>
                本产品收集的有关您的信息和资料将保存在本产品及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本产品收集信息和资料所在地的境外并在境外被访问、存储和展示。
              </p>
              <p>5. Cookie的使用</p>
              <p>
                a)在您未拒绝接受cookies的情况下，本产品会在您的手机上设定或取用cookies，以便您能登录或使用依赖于cookies的本产品平台服务或功能。本产品使用cookies可为您提供更加周到的个性化服务，包括推广服务。
              </p>
              <p>
                b)您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的本产品网络服务或功能。
              </p>
              <p>c)通过本产品所设cookies所取得的有关信息，将适用本政策。</p>
              <p>6.信息安全</p>
              <p>
                a)
                本产品帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本产品将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。
              </p>
              <p>
                b)在使用本产品网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本产品用户名及密码发生泄露，请您立即联络本产品客服，以便采取相应措施
              </p>
              <p>
                c)
                本产品收集到的您在发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；
              </p>
              <p>d)违反法律规定或违反规则行为及已对您采取的措施。</p>
              <p>7.本隐私政策的更改</p>
              <p>
                a）如果决定更改隐私政策，我们会在本政策中，以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。
              </p>
              <p>
                B）保留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，会通过网站通知的形式告知。
              </p>
              <p>
                使用方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用客服，以便本应用采取相应措施。
              </p>
            </div>
          }
          {Number(type) === 2 &&
            <div className="viewPosition_lists_content_left">
              <p>用户服务协议</p><p>
                欢迎注册并使用武汉德特云才数字科技有限公司所提供的产品及服务（以下合称为产品或服务，或分开列明）。本协议是由武汉德特云才数字科技有限公司(以下简称我司或本公司)与用户(指注册、登录、使用我司服务的法人、自然人、非发热组织，以下有时称为“您”)就产品名称(以下简称“本产品”)提供的服务所订立的相关权利义务规范。</p>
              <p>一、总则</p>
              <p>1、用户在注册及使用前请认真阅读本协议，确保充分理解本协议中所有条款。除非您接受本协议所有条款，否则您无权注册、登录或使用本协议所涉服务。您的注册、登录、使用等行为将视为无条件接受本协议所有条款的约束。</p>
              <p>2、除非另有明确规定，本产品所推出的新功能、新服务，均无条件的使用本协议。</p>
              <p>3、我司保留在任何时候修改本协议条款的权利，且无需另行通知。在我司修改协议条款后，如果您不接受修改后的条款，请立即停止使用本产品提供的服务，继续使用本产品提供的服务将被视为接受修改后的协议。</p>
              <p>二、用户注册</p>
              <p>1、用户应当同意本协议的全部条款并按照页面提示完成全部注册程序，用户在注册过程中点击“下一步”按钮即表示完全接受本协议全部条款。</p>
              <p>2、用户在使用本产品（服务）前需要注册一个本产品账号。本产品可以根据用户需求或产品需求对账号注册和绑定的方式进行更改，而无须事先通知用户。</p>
              <p>3、用户在使用本产品服务过程中应保证各项服务业务所需信息的真实性，如果因信息不真实而引起的问题，以及问题发生所带来的后果，本公司不负任何责任。</p>
              <p>4、在用户注册及使用本产品时，必要时将搜集能识别用户身份的个人信息以便系统可以在必要时联系用户，或为用户提供更好的使用体验。系统搜集的信息及使用将受限于用户个人隐私信息保护的约束。</p>
              <p>三、服务内容</p>
              <p>1、本服务的具体内容由本产品根据实际情况提供，本产品可以对提供的服务予以变更，且本产品提供的服务内容可能随时变更，用户将会收到关于服务变更的通知。</p>
              <p>2、除非本协议另有其他明示规定，本公司所推出的新产品、新功能、新服务，均受到本协议条款之规范。</p>
              <p>四、服务变更、中断或终止</p>
              <p>1、鉴于网络服务的特殊性(包括但不限于服务器的稳定性问题、恶意的网络攻击等行为的存在及其他无法控制的情形)，用户同意我司有权随时中断或终止部分或全部的服务。</p>
              <p>2、我司需要定期或不定期地对提供服务的系统或相关设备进行检修或维护，如因此类情况而造成服务在合理时间内的中断，我司无需为此承担任何责任。</p>
              <p>3、如发生下列任何一种情形，我司有权随时变更、中断或终止向用户提供本协议项下的服务而无需对用户或任何第三方承担任何责任：</p>
              <p>(1)根据法律规定用户应提交真实信息，而用户提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明;</p>
              <p>(2)用户违反相关法律法规或本协议的约定;</p>
              <p>(3)按照法律规定或有权机关的要求;</p>
              <p>(4)出于安全的原因或其他必要的情形。</p>
              <p>五、用户个人隐私信息保护</p>
              <p>1、依据法律的规定，我们将在特定情形下收集、使用和披露您的个人信息。以下条款描述了我们如何收集、使用和披露您的个人信息。</p>
              <p>2、信息收集</p>
              <p>(1)用户提供</p>
              <p>我们会对您直接提供的信息进行保存。比如：我们会记录您的注册信息、寻求客服或者其他和我们沟通的记录。记录信息的种类包括：头像、昵称、性别、出生日期、所在地区以及其他您选择提供的信息。我们收集、使用和披露个人信息是为了通过创建账户、识别用户、回应查询和邮件等方式来为您提供服务。</p>
              <p>(2)自动收集</p>
              <p>当你接触或者使用我们的服务时，我们将自动收集您的信息包括：</p>
              <p>Log 信息(我们记录所有您使用服务时的log信息，包括浏览器信息、使用时间、浏览的网页、IP地址及来源)。我们使用多种技术记录信息，包括但不限于Cookies信息，Cookies是一些存在您的硬件上的小数据包，用以帮助我们提高服务的质量及您的使用体验，了解在哪些区域和功能上受欢迎，以及统计流量等。</p>
              <p>3、信息使用</p>
              <p>(1)除本隐私政策未载明或本隐私政策的更新未能首先通知您的情况下，您的个人信息将不会用于其他目的。</p>
              <p>(2)匿名汇总统计数据不是我司所定义的个人用户信息，我们将为多种目的，包括但不限于分析和使用模式的报告等，来保存和使用此类信息。我司保留以任何目的或单方面许可第三方使用和披露匿名汇总统计数据的权利。</p>
              <p>(3)您在本产品中上传的信息，有可能会损坏您或他人的合法权益，您必须充分意识此类风险的存在。您明确同意，自行承担因上传信息所存在的一切风险及后果，我司无需承担任何责任。</p>
              <p>4、法定披露</p>
              <p>虽然我们会尽最大努力保护用户隐私，但当我们有理由相信只有公开个人信息才能遵循现行司法程序、 法院指令或其他法律程序或者保护我司、我司用户或第三方的权利、财产或安全时，我们可能披露个人信息。</p>
              <p>5、信息安全</p>
              <p>我们会采取合理的实际及电子手段以及规程保障措施来保护您的个人信息。 虽然通过因特网信息传输数据并非100% 安全，但我们已经采取并将继续采取商业范畴内合理的努力来确保您的个人信息得到保护。</p>
              <p>6、未成年人隐私保护</p>
              <p>我司重视对未成年人个人隐私信息的保护。我司将依赖用户提供的个人信息判断用户是否为未成年人。任何18岁以下的未成年人注册账号或使用本服务应事先取得家长或其法定监护人(以下简称“监护人”)的书面同意。除根据法律法规的规定及有权机关的指示披露外，我司不会使用向任何第三方透露未成年人的个人隐私信息。</p>
              <p>六、内容规范</p>
              <p>1、本项规范所述内容是指用户使用本服务过程中所制作、上载、复制、发布、传播的任何内容，包括但不限于账号头像、名称、个性签名等注册信息及认证资料，或文字、语音、图片、图文等发送、回复消息和相关链接页面，以及其他使用本产品账号或本服务所产生的内容。</p>
              <p>2、用户承诺使用本产品的服务时必须符合中华人民共和国有关法律法规，不得利用本产品的服务制作、上载、复制、发布、传播以下内容：</p>
              <p>(1)反对宪法所确定的基本原则的;</p>
              <p>(2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的;</p>
              <p>(3)损害国家荣誉和利益的;</p>
              <p>(4)煽动民族仇恨、民族歧视，破坏民族团结的;</p>
              <p>(5)破坏国家宗教政策，宣扬邪教和封建迷信的;</p>
              <p>(6)散布谣言，扰乱社会秩序，破坏社会稳定的;</p>
              <p>(7)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的;</p>
              <p>(8)侮辱或者诽谤他人，侵害他人合法权益的;</p>
              <p>(9)含有法律、行政法规禁止的其他内容的。</p>
              <p>3、用户不得利用本产品账号或本服务制作、上载、复制、发布、传播下干扰本产品正常运营，以及侵犯其他用户或第三方合作权益的内容：</p>
              <p>(1)含有任何性暗示的;</p><p>(2)含有辱骂、恐吓、威胁内容的;</p>
              <p>(3)含有骚扰、垃圾广告、恶意信息、诱骗信息的;</p>
              <p>(4)涉及他人隐私、个人信息或资料的;</p><p>(5)含有其他干扰本服务正常运营和侵犯其他用户或第三方合法权益的。</p>
              <p>七、使用规则</p><p>1、用户在本服务中或通过本服务所传送、发布的任何内容并不反映或代表，也不得被视为反映或代表我司的观点、立场或政策，我司对此不承担任何责任。</p>
              <p>2、用户在使用本产品时，必须遵守中华人民共和国相关法律法规的规定，同意将不会利用本产品进行任何违法或不正当的活动，包括但不限于下列行为：</p>
              <p>(1)干扰或破坏有关服务，或与有关服务连接的任何服务器或网络，或与有关服务相关的任何政策、要求或规定;</p><p>(2)采集并存储涉及任何其他用户的个人信息，以用于任何被禁止的活动;</p>
              <p>(3)故意或非故意违反任何相关的中国法律、法规、规章、条例等其他具有法律效力的规范。</p>
              <p>3、用户须对利用本产品账号或本服务传送信息的真实性、合法性、无害性、准确性、有效性等全权负责，与用户所传播信息相关的任何法律责任由用户自行承担，与我司无关。如因此给我司或第三方造成损害的，用户应当依法予以赔偿。</p>
              <p>4、本产品提供的服务中可能包括广告，用户同意在使用过程中显示本产品和第三方供应商、合作伙伴提供的广告。除法律法规明确规定外，用户应自行对该广告信息进行的交易负责，对用户因该广告信息进行的交易或前述广告商提供的内容或遭受的损失或损害，我司不承担任何责任。</p><p>5、用户为使用本产品，须自行配备进入国际互联网所必需的设备，包括电脑、手机及其他与接入国际互联网有关的装置，并自行支付与此服务有关的费用。</p>
              <p>八、免责声明</p><p>1、对于经由本产品/服务而传送的内容，我司不保证前述内容的正确性、完整性或品质。用户在接受有关服务时，有可能会接触到令人不快、不适当或令人厌恶的内容。在任何情况下，我司均不对任何内容负责，包括但不限于任何内容发生任何错误或纰漏以及衍生的任何损失或损害。用户使用上述内容，应自行承担风险。</p><p>2、用户明确同意其使用本产品所存在的风险及其后果将完全由其自己承担，我司对用户不承担任何责任。如因用户违反有关法律、法规或本协议项下的任何条款而给任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任。</p><p>3、我司尊重并保护用户的个人隐私权。但因恶意的网络攻击等行为及其他无法控制的情形，导致用户隐私信息泄露的，用户同意我司不承担任何责任。</p>
              <p>4、对于因电信系统或互联网网络故障、计算机故障、计算机系统问题或其它任何不可抗力原因而产生损失, 我司不承担任何责任,但将尽力减少因此给用户造成的损失和影响。</p>
              <p>九、知识产权声明</p>
              <p>1、本产品/服务中包含的任何文字、图表、音频、视频和软件(包括但不限于软件中包含的图表、动画、音频、视频、界面实际、数据和程序、代码、文档)等信息或材料均受著作权法、商标法和其它法律法规保护，未经相关权利人书面同意，用户不得以任何方式使用该信息或材料。</p>
              <p>2、本协议未授予用户使用本产品任何商标、服务标记、标识、域名和其他显著品牌特征的权利，任何人不得擅自(包括但不限于：以非法的方式复制、传播、展示、镜像、上载、下载)使用，否则我司将依法追究法律责任。</p>
              <p>3、除本协议明确允许以外，用户不得以任何形式或任何方式对本产品部分或全部内容进行修改、出租、租赁、出借、出售、分发、复制、创作衍生品或用于任何商业用途。</p>
              <p>十、法律适用</p>
              <p>1、本协议的订立、执行和解释及争议的解决均应适用中国法律并受中国法院管辖。如服务条款任何一部分与中华人民共和国法律相抵触，则该部分条款应按法律规定重新解释，部分条款无效或重新解释不影响其余条款法律效力。</p>
              <p>2、用户和我司一致同意本协议。在执行本协议过程中如发生纠纷，双方应友好协商解决;协商不成时，任何一方可直接向我司所在地的人民法院提起诉讼。</p>
              <p>十一、其他规定</p>
              <p>1、本协议中的标题仅为方便而设，在解释本协议时应被忽略。</p>
              <p>2、本协议及其修改权、最终解释权归我司所有。</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Agreement;
